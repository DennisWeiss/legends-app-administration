import mongoose from 'mongoose'


const VersionLocationData = new mongoose.Schema({
  type: {type: mongoose.Schema.Types.ObjectId, required: true},
  version: {type: String, required: true}
}, {
  strict: true
})


export default mongoose.model('VersionLocationData', VersionLocationData)
