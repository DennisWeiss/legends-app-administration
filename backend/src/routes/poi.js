const express = require("express");
const router = express.Router();

import POI from "../models/poi.model";
import { mapListOfPOIsToDict } from "../mapper/poi.mapper";

import VersionLocationData from "../models/version-location-data";

const updateVersions = require("../utils/updateVersions");

const auth = require('../middlewares/authentication');

router.post("/", auth, async (req, res) => {
  const poi = new POI(req.body);
  await poi.save();
  updateVersions(req.body, res);
  res.send("POI created successfully");
});

router.put("/", auth, async (req, res) => {
  const result = await POI.findOneAndUpdate({ key: req.body.key }, req.body);
  console.log(result);
  if (!result) {
    res.send(404, { message: "POI not found!" });
  }
  await updateVersions(req.body, res);
  res.send("POI updated successfully");
});

router.get("/", async (req, res) => {
  const poi = await POI.find({});
  const versions = await VersionLocationData.find({});
  res.send(mapListOfPOIsToDict(poi, versions));
});

router.get("/:type", async (req, res) => {
  const poi = await POI.find({ type: req.params.type });
  const versions = await VersionLocationData.find({});
  res.send(mapListOfPOIsToDict(poi, versions));
});

router.get("/key/:key", async (req, res) => {
  const poi = await POI.findOne({ key: req.params.key });
  if (!poi) {
    return res.status(404).send({ message: "POI not found!" });
  }
  res.send(poi);
});

module.exports = router;
