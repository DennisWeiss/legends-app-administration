import POI from '../models/poi.model'
import { mapListOfPOIsToDict } from '../mapper/poi.mapper'

import VersionLocationData from '../models/version-location-data'

const express = require('express')
const router = express.Router()

const updateVersions = require('../utils/updateVersions')

const auth = require('../middlewares/authentication')
const admin = require('../middlewares/admin')


router.post('/', async (req, res, next) => {
  const poi = new POI(req.body)

  try {
    await poi.addContent(req.body.media.content);
  } catch (err) {
    return res.status(400).send({ message: 'Invalid content!', error: err })
  }

  await poi.save()
  updateVersions(req.body, res)
  return res.send(`POI of type ${poi.type} created successfully`);
})

router.put('/', async (req, res) => {
  const poi = await POI.findOne({ key: req.body.key });

  if (!poi) {
    res.send(404, { message: 'POI not found!' })
  }

  //remove existing langs
  poi.media.content.clear();
  
  try {
    await poi.addContent(req.body.media.content);
  } catch (err) {
    return res.status(400).send({ message: 'Invalid content!', error: err })
  }

  await poi.save();

  await updateVersions(req.body, res)
  res.send(`POI of type ${poi.type} updated successfully`);
});

router.delete('/:key', auth, admin, async (req, res, next) => {
  const poi = await POI.findOneAndDelete({ key: req.params.key })
  if (!poi) {
    return res.status(404).send({ message: 'Deletion failed. POI not found!' })
  }

  return res.status(200).send({
    message: `POI of type ${poi.type} successful deleted!`,
    oldPoi: poi
  })
})

router.get('/', async (req, res) => {
  const poi = await POI.find({})
  const versions = await VersionLocationData.find({})
  res.send(mapListOfPOIsToDict(poi, versions))
})

router.get('/:type', async (req, res) => {
  const poi = await POI.find({ type: req.params.type })
  const versions = await VersionLocationData.find({})
  res.send(mapListOfPOIsToDict(poi, versions))
})

router.get('/key/:key', async (req, res) => {
  const poi = await POI.findOne({ key: req.params.key })
  if (!poi) {
    return res.status(404).send({ message: 'POI not found!' })
  }
  res.send(poi)
})

module.exports = router
