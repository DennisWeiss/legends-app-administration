import VersionLocationData from "../models/version-location-data";
import { increaseVersion } from "../helper/helper-functions";

module.exports = async (poi, res) =>
  poi.type &&
  VersionLocationData.findOne({ type: poi.type }, async (err, vLocData) => {
    if (err) {
      return next(err);
    }
    if (!vLocData) {
      const versionLocationData = new VersionLocationData({
        type: poi.type,
        version: `v${poi.type.substr(0, 1)}.1.1`
      });
      try {
        await versionLocationData.save();
      } catch (err) {}
    } else {
      try {
        await vLocData.increaseVersion();
      } catch (err) {}
    }
  });
