import POI from '../models/poi.model'
import {mapListOfPOIsToDict} from '../mapper/poi.mapper'

import VersionLocationData from '../models/version-location-data'
import {applyUrlToContentOfPoi, applyUrlToPoi} from '../utils/helperfunctions'

const winston = require('winston')

const express = require('express')
const router = express.Router()

const updateVersions = require('../utils/updateVersions')

const auth = require('../middlewares/authentication')
const permission = require('../middlewares/authorization')
const filePaths = require('../middlewares/filepaths').middleware

const multer = require('multer')
import fs from 'fs'

const mimetypes = require('../middlewares/file-validation').mimetypes
const validateFiles = require('../middlewares/file-validation').validate


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = mimetypes.includes(file.mimetype)
    let error = new Error('Invalid MIME type!')
    if (isValid) {
      error = null
    }
    cb(error, 'files')
  },
  filename: (req, file, cb) => {

    //remove spaces and replace them with '-'
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-')

    //handling filenames with additional points in between
    const fileNameArr = name.split('.')
    const ext = fileNameArr.pop()
    const fileName = fileNameArr.join('')

    cb(null, fileName + '-' + Date.now() + '.' + ext)
  }
})

const upload = multer({storage: storage})

const formData = [
  {name: 'icon_default'},
  {name: 'icon_explored'},
  {name: 'image_preview'},
  {name: 'video_ar_scene'},
  {name: 'video_icon_scene'},
  {name: 'vuforia_targets', maxCount: 30}
]


router.post('/', auth, upload.fields(formData), validateFiles, filePaths, async (req, res, next) => {
  const body = req.body

  const poi = new POI(body)

  try {
    // generate unique key consisting of english name for better identification
    poi.key = await poi.generateKey()
  } catch (err) {
    return res.status(400).send({message: err.message, error: err})
  }

  try {
    await poi.addContent(body.media.content, poi.key)
  } catch (err) {
    return res.status(400).send({message: err.message, error: err})
  }

  await poi.save()
  await updateVersions(body, res)
  return res.send({message: `POI of type ${poi.type} created successfully`})
})

router.put('/', auth, permission('EDIT'), upload.fields(formData), validateFiles, filePaths, async (req, res, next) => {

  try {
    await POI.validateContent(req.body.media.content, req.body.type)
  } catch (err) {
    return res.status(400).send({message: 'Invalid content!', error: err})
  }

  const poi = new POI(req.body)

  try {
    await poi.addContent(req.body.media.content, poi.key)
  } catch (err) {
    console.error(err)
    return res.status(400).send({message: err.message, error: err})
  }

  const poiObj = poi.toObject()
  delete poiObj._id

  // package unique-express-validator needs to have "context: 'query'" set to work properly
  await POI.findOneAndUpdate({key: req.body.key}, poiObj, {runValidators: true, context: 'query', upsert: true})

  if (!poi) {
    return res.status(404).send({message: 'POI not found!'})
  }

  await updateVersions(req.body, res)
  res.send({message: `POI of type ${poi.type} updated successfully`})
})

router.delete('/:key', auth, permission('ADMIN'), async (req, res, next) => {
  const poi = await POI.findOneAndDelete({key: req.params.key})
  if (!poi) {
    return res.status(404).send({message: 'Deletion failed. POI not found!'})
  }

  return res.status(200).send({
    message: `POI of type ${poi.type} deleted successfully`,
    oldPoi: poi
  })
})

router.get('/', async (req, res) => {
  const pois = await POI.find({})
  pois.forEach(poi => {
    if (req.query.htmlContent === 'true') {
      poi.withHtmlContent()
    } else {
      applyUrlToContentOfPoi(poi, req)
    }
    applyUrlToPoi(poi, req)
  })

  const versions = await VersionLocationData.find({})
  res.send(mapListOfPOIsToDict(pois, versions))
})

router.get('/:type', async (req, res) => {
  const pois = await POI.find({type: req.params.type})
  pois.forEach(poi => {
    if (req.query.htmlContent === 'true') {
      poi.withHtmlContent()
    } else {
      applyUrlToContentOfPoi(poi, req)
    }
    applyUrlToPoi(poi, req)
  })
  const versions = await VersionLocationData.find({})
  res.send(mapListOfPOIsToDict(pois, versions))
})

router.get('/key/:key', async (req, res) => {
  const poi = await POI.findOne({key: req.params.key})
  if (req.query.htmlContent === 'true') {
    poi.withHtmlContent()
  } else {
    applyUrlToContentOfPoi(poi, req)
  }
  applyUrlToPoi(poi, req)

  if (!poi) {
    return res.status(404).send({message: 'POI not found!'})
  }
  res.send(poi)
})


module.exports = router
