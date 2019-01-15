import mongoose from 'mongoose'
import fs from 'fs'

const winston = require('winston');

const uniqueValidator = require('mongoose-unique-validator');
 
const RestaurantContent = require('./content/restaurant-content');
const LegendContent = require('./content/legend-content');
const SightContent = require('./content/sight-content');

const poiContentModelCallbacks = {
  restaurants: RestaurantContent,
  sights: SightContent,
  legends: LegendContent
}

const beaconValidator = function(v) {
  return new Promise(function(resolve, reject) {
   const Beacon =  mongoose.model('Beacon');
  
   // beaconId of -1 -> no beacon
   if(v == -1) {resolve(true)} 
   
   Beacon.findOne({beaconId: v})
   .then((result) => {
     if(!result) {
       resolve(false); 
      } else {
        resolve(true);
      }
   })

  });
}

const POISchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    publishingTimestamp: {type: Number, required: true},
    beaconId: { 
      type: Number, 
      required: true,
      validate: {
        validator: beaconValidator,
      message: function(props) {
        return `Beacon with an ID of '${props.value}' does not exist!`;
      }
      }
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    icons: {
      default: { type: String, required: false },
      explored: { type: String, required: false }
    },
    media: {
      content: {
        type: Map,
        of: {}
      },
      image: {
        preview: { type: String, required: false }
      },
      video: {
        arScene: { type: String, required: false },
        iconScene: { type: String, required: false }
      },
      vuforiaTargets: [String]
    },
    type: { type: String, required: true }
  },
  {
    strict: true
  }
)


const formatToKey = (name, iteration) => {
  return name.toLowerCase().trim().replace(/\s+/g,'_') + (iteration ? iteration.toString() : '')
}

const keyExists = async key => {
  const POI = require('mongoose').model('POI');
  return !!(await POI.findOne({key}))
}

const generateKey = async (key, iteration = 0) => {

  key = formatToKey(key, iteration)

  if (await keyExists(key)) {
    return await generateKey(key, iteration + 1)
  }
  return key
}

const formatFilename = (filename, iteration) => filename + (iteration === 0 ? '' : iteration)

const generateNewFilename = (filename, iteration = 0) => {
  const formattedFilename = formatFilename(filename, iteration)
  if (fs.existsSync(`files/${formattedFilename}`)) {
    return generateNewFilename(filename, iteration + 1)
  }
  return formattedFilename
}

const getContentAndSaveHtmlFiles = (contentObj, key, lang) => {
  const fields = ['explored', 'preview']

  fields.forEach(field => {
    const fieldContent = contentObj[field].url
    const fieldFilename = `${generateNewFilename(`${key}_${field}_${lang}`)}.html`
    fs.writeFile(`files/${fieldFilename}`, fieldContent)
    contentObj[field].url = fieldFilename
  })

  contentObj.puzzle.hints = contentObj.puzzle.hints.map(hint => {
    const hintFilename = `${generateNewFilename(`${key}_hint_${lang}.html`)}.html`
    fs.writeFile(`files/${hintFilename}`, hint)
    return hintFilename
  })

  return contentObj
}

POISchema.methods.addContent = async function (content, key) {
  // set content dynamically
  const Content = poiContentModelCallbacks[this.type]

  // no model in callbacks found for given type
  if(!Content) {
    throw new Error('POI-type does not exist!');
  }

  for (let [lang, contentObj] of Object.entries(content)) {
    const content = new Content(getContentAndSaveHtmlFiles(contentObj, key, lang))
    await content.validate();
    this.media.content.set(lang, content);
  }
}

POISchema.statics.validateContent = async function (content, type) {
  const Content = poiContentModelCallbacks[type]

   // no model in callbacks found for given type
   if(!Content) {
    throw new Error('POI-type does not exist!');
  }

  for (let [lang, contentObj] of Object.entries(content)) {
    const content = new Content(contentObj)
    await content.validate();
  }
}

POISchema.methods.generateKey = async function(iteration = 0) {

  if (!this.media || !this.media.content || !this.media.content.get('en') || !this.media.content.get('en').name) {
    winston.warn('lol');
    throw new Error('Creation of key failed! English name cannot be found on POI-object.');
  }
  return await generateKey(this.media.content.get('en').name, iteration);
}


POISchema.plugin(uniqueValidator);


export default mongoose.model('POI', POISchema)
