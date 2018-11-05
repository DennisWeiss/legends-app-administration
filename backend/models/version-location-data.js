import mongoose from 'mongoose'


const VersionLocationData = new mongoose.Schema({
  type: {type: String, required: true},
  version: {type: String, required: true}
}, {
  strict: true
})


export default mongoose.model('POI', VersionLocationData)
