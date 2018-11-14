import mongoose from 'mongoose'

import {increaseVersion} from '../helper/helper-functions';

const VersionLocationData = new mongoose.Schema({
  type: {type: String, required: true, index: {unique: true}},
  version: {type: String, required: true}
}, {
  strict: true
})

VersionLocationData.methods.increaseVersion = async function() {
  this.version = increaseVersion(this.version);
  await this.save();
}


export default mongoose.model('VersionLocationData', VersionLocationData)
