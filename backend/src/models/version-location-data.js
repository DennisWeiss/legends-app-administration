import mongoose from 'mongoose'


const VersionLocationData = new mongoose.Schema({
  type: {type: String, required: true, index: {unique: true}},
  version: {type: String, required: true}
}, {
  strict: true
})


export default mongoose.model('VersionLocationData', VersionLocationData)
