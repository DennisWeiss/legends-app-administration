import mongoose from 'mongoose'

const uniqueValidator = require('mongoose-unique-validator');
 
const RestaurantContent = require('./content/restaurant-content');
const LegendContent = require('./content/legend-content');
const SightContent = require('./content/sight-content');

const poiContentModelCallbacks = {
  restaurants: RestaurantContent,
  sights: SightContent,
  legends: LegendContent
}

const POISchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    publishingTimestamp: {type: Number, required: true},
    beaconId: { 
      type: Number, 
      required: true,
      validate: {
        validator: function(v) {
        return new Promise(function(resolve, reject) {
          console.log('validate');
         const Beacon =  mongoose.model('Beacon');
         Beacon.findOne({beaconId: v})
         .then((result) => {
           if(!result) {
             resolve(false); 
            } else {
              resolve(true);
            }
         })

        });
      },
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
    name: {
      type: Map,
      of: String
    },
    type: { type: String, required: true }
  },
  {
    strict: true
  }
)


const formatToKey = (name, iteration) => {
  return name.toUpperCase().trim().replace(/\s+/g,'-') + (iteration ? iteration.toString() : '')
}

const keyExists = async key => {
  const POI = require('mongoose').model('POI');
  return !!(await POI.findOne({key}))
}

const generateKey = async (poi, iteration = 0) => {
  const key = formatToKey(poi.name.get('en'), iteration)
  if (await keyExists(key)) {
    return generateKey(poi, iteration + 1)
  }
  return key
}

POISchema.methods.addContent = async function (content) {
  // set content dynamically
  const Content = poiContentModelCallbacks[this.type]
  for (let [lang, contentObj] of Object.entries(content)) {
    const content = new Content(contentObj)
    await content.validate();
    this.media.content.set(lang, content);
  }
}

POISchema.statics.validateContent = async function (content, type) {
  const Content = poiContentModelCallbacks[type]
  for (let [lang, contentObj] of Object.entries(content)) {
    const content = new Content(contentObj)
    await content.validate();
  }
}

POISchema.methods.generateKey = async function(iteration = 0) {
  return await generateKey(this, iteration);
}

POISchema.methods.validateBeacon  = async function() {
  
}

POISchema.plugin(uniqueValidator);


export default mongoose.model('POI', POISchema)
