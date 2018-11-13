import VersionLocationData from "../models/version-location-data";
import { increaseVersion } from "../helper/helper-functions";

module.exports = async (poi, res) =>
  poi.type &&
  VersionLocationData.find({ type: poi.type }, async (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.length === 0) {
      const versionLocationData = new VersionLocationData({
        type: poi.type,
        version: `v${poi.type.substr(0, 1)}.1.1`
      });
      try {
        await versionLocationData.save();
      } catch (err) {}
    } else {
      try {
        await versionLocationData.increaseVersion();
      } catch (err) {}
    }
  });
