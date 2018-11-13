
import VersionLocationData from '../models/version-location-data'
import {increaseVersion} from '../helper/helper-functions';

module.exports = (poi, res) =>
poi.type &&
VersionLocationData.find({type: poi.type}, (err, result) => {
  if (err) {
    return next(err)
  }
  if (result.length === 0) {
    const versionLocationData = new VersionLocationData({
      type: poi.type,
      version: `v${poi.type.substr(0, 1)}.1.1`
    })
    versionLocationData.save(err => null)
  } else {
    VersionLocationData.findOneAndUpdate({type: poi.type}, {
      type: poi.type,
      version: increaseVersion(result[0].version)
    }, (err, versionLocationData) => {
      if (err) {
        return null
      }
    })
  }
})