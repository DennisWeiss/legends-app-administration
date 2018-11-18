import POI from '../models/poi.model'
import { mapListOfPOIsToDict } from '../mapper/poi.mapper'

import VersionLocationData from '../models/version-location-data'

const express = require('express')
const router = express.Router()

const updateVersions = require('../utils/updateVersions')

const auth = require('../middlewares/authentication')
const admin = require('../middlewares/admin')
const filePaths = require('../middlewares/filepaths');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //const isValid = MIME_TYPE_MAP[file.mimetype];
   // let error = new Error("Invalid MIME type");
    //if (isValid) {
      //error = null;
    //}
    cb(null, "files");
  },
  filename: (req, file, cb) => {

    //remove spaces and replace them with '-'
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    //const ext = MIME_TYPE_MAP[file.mimetype];

    const ext = name.split('.')[1];

    //example: test-1.1.2001.jpg
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

const upload = multer({ storage: storage });

const formData = [
  {name: 'icon_default'},
  {name: 'icon_explored'},
  {name: 'image_preview'},
  {name: 'video_ar_scene'},
  {name: 'video_icon_scene'},
  {name: 'vuforia_targets', maxCount: 30}
];

router.post('/', upload.fields(formData), filePaths, async (req, res, next) => {

  const body = req.body;

  const poi = new POI(body);

  try {
    await poi.addContent(body.media.content);
  } catch (err) {
    return res.status(400).send({ message: 'Invalid content!', error: err })
  }

  await poi.save()
  await updateVersions(body, res);
  return res.send({message: `POI of type ${poi.type} created successfully`});
})

router.put('/', upload.fields(formData), filePaths, async (req, res, next) => {

  const poi = await POI.findOneAndUpdate({ key: req.body.key }, req.body);

  if (!poi) {
    return res.status(404).send({ message: 'POI not found!' })
  }
  /*
  //remove existing langs
  poi.media.content.clear();
  
  try {
    await poi.addContent(req.body.media.content);
  } catch (err) {
    return res.status(400).send({ message: 'Invalid content!', error: err })
  }

  await poi.save();
*/
  await updateVersions(req.body, res);
  res.send({message: `POI of type ${poi.type} updated successfully`});
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
