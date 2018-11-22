import mongoose from 'mongoose'

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
    key: { type: String, required: true, index: { unique: true } },
    beaconId: { type: Number, required: true },
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

export default mongoose.model('POI', POISchema)
