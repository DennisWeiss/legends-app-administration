import mongoose from 'mongoose'

const uniqueValidator = require('mongoose-unique-validator');
 
const RestaurantContent = require('./content/restaurant-content');
const LegendContent = require('./content/legend-content');
const SightContent = require('./content/sight-content');

/**
 * !!! ADD ALL NEW CONTENT-TYPE-MODELS HERE !!!
 */

const poiContentModelCallbacks = {
  restaurants: RestaurantContent,
  sights: SightContent,
  legends: LegendContent
}


const beaconValidator = function(v) {
  return new Promise(function(resolve, reject) {
   const Beacon =  mongoose.model('Beacon');
  
   // beaconId of -1 -> no beacon
   if(v === -1) {resolve(true)}
   
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
  const formattedKey = formatToKey(key, iteration)

  if (await keyExists(formattedKey)) {
    return await generateKey(key, iteration + 1)
  }
  return formattedKey
}

POISchema.methods.addContent = async function (contents, key) {
  // set content dynamically
  const Content = poiContentModelCallbacks[this.type]

  // no model in callbacks found for given type
  if(!Content) {
    throw new Error('POI-type does not exist!');
  }

  for (let [lang, contentObj] of Object.entries(contents)) {
    const content = new Content(contentObj)
    content.withSavedHtmlContent(key, lang)
    try {
    await content.validate()
    } catch(err) {
      return new Error("Invalid content!");
    }
    this.media.content.set(lang, content)
  }
}

POISchema.methods.withHtmlContent = function () {
  // set content dynamically
  const Content = poiContentModelCallbacks[this.type]

  // no model in callbacks found for given type
  if(!Content) {
    throw new Error('POI-type does not exist!');
  }

  for (let [lang, contentObj] of this.media.content.entries()) {
    const content = new Content(contentObj)
    content.withHtmlContent()
    this.media.content.set(lang, content)
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

/**
 * generate key out of english name in this.media.content
 */

POISchema.methods.generateKey = async function(iteration = 0) {

  if (!this.media || !this.media.content || !this.media.content.get('en') || !this.media.content.get('en').name) {
    throw new Error('Creation of key failed! English name cannot be found on POI-object.');
  }
  return await generateKey(this.media.content.get('en').name, iteration);
}


POISchema.plugin(uniqueValidator);

export default mongoose.model('POI', POISchema)
