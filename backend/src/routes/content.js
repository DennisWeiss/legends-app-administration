import POI from '../models/poi.model'

const express = require('express')
const router = express.Router()

const updateVersions = require('../utils/updateVersions')

const auth = require('../middlewares/authentication')
const admin = require('../middlewares/admin')

router.put('/:key', async (req, res, next) => {
  const poi = await POI.findOne({ key: req.params.key })

  if (!poi) {
    res.status(404).send({ message: 'POI not found!' });
  }

  // remove existing langs
  poi.media.content.clear()

  try {
    await poi.addContent(req.body);
  } catch (err) {
    return res.status(400).send({ message: 'Invalid content!', error: err });
  }
  await poi.save()

  await updateVersions(req.body, res)
  res.send(`POI-content of type ${poi.type} updated successfully`);
});

module.exports = router
