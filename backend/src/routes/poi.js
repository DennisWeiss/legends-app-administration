const express = require('express');
const router = express.Router();

import POI from '../models/poi.model'
import {mapListOfPOIsToDict} from '../mapper/poi.mapper'

import VersionLocationData from '../models/version-location-data'

const updateVersions = require('../utils/updateVersions');

router.post('/', (req, res) => {
  const poi = new POI(req.body)
  poi.save(err => {
    if (err) {
      res.send(500, {error: err})
    }
    updateVersions(req.body, res)
    res.send('POI created successfully')
  })
})

router.put('/', (req, res) => {
  POI.findOneAndUpdate({key: req.body.key}, req.body, (err, poi) => {
    if (err) {
      res.send(500, {error: err})
    }
    updateVersions(req.body, res)
    res.send('POI updated successfully')
  })
})

router.get('/', (req, res) => {
  POI.find({}, (err, poi) => {
    if (err) {
      res.send(500, {error: err})
    }
    VersionLocationData.find({}, (err, versions) => {
      res.send(mapListOfPOIsToDict(poi, versions))
    })
  })
})

router.get('/:type', (req, res) => {
    POI.find({type: req.params.type}, (err, poi) => {
        if (err) {
            res.send(500, {error: err})
        }
        VersionLocationData.find({}, (err, versions) => {
            res.send(mapListOfPOIsToDict(poi, versions))
        })
    })
})

router.get('/key/:key', (req, res) => {
  POI.findOne({key: req.params.key}, (err, poi) => {
    if (err) {
      return next(err)
    }
    res.send(poi)
  })
})

module.exports = router;