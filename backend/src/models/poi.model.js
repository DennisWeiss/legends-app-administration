import mongoose from 'mongoose'


const POISchema = new mongoose.Schema({
  key: {type: String, required: true, index: {unique: true}},
  beaconId: {type: Number, required: true},
  coordinates: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
  },
  icons: {
    default: {type: String, required: false},
    explored: {type: String, required: false}
  },
  media: {
    content: {
      type: Map,
      of: {
        explored: {
          url: {type: String, required: true}
        },
        preview: {
          url: {type: String, required: true}
        },
        puzzle: {
          hints: [{
            index: {type: Number, required: true},
            url: {type: String, required: true}
          }]
        }
      }
    },
    image: {
      preview: {type: String, required: false}
    },
    video: {
      arScene: {type: String, required: false},
      iconScene: {type: String, required: false}
    },
    vuforiaTargets: [String],
  },
  name: {
    type: Map,
    of: String
  },
  type: {type: String, required: true}
}, {
  strict: true
})


export default mongoose.model('POI', POISchema)
