import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import appConf from './app-conf'

import POI from './models/poi.model'
import VersionLocationData from './models/version-location-data'

import {mapListOfPOIsToDict} from './mapper/poi.mapper'
import {mapVersionLocationData} from './mapper/version-location-data.mapper'

import {increaseVersion} from './helper/helper-functions'


const app = express()

app.listen(appConf.serverPort)


mongoose.connect(appConf.mongoDbUrl, {useNewUrlParser: true})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


const updateVersions = (poi, res) =>
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




app.post('/', (req, res) => {
  const poi = new POI(req.body)
  poi.save(err => {
    if (err) {
      res.send(500, {error: err})
    }
    updateVersions(req.body, res)
    res.send('POI created successfully')
  })
})

app.put('/', (req, res) => {
  POI.findOneAndUpdate({key: req.body.key}, req.body, (err, poi) => {
    if (err) {
      res.send(500, {error: err})
    }
    updateVersions(req.body, res)
    res.send('POI updated successfully')
  })
})

app.get('/', (req, res) => {
  POI.find({}, (err, poi) => {
    if (err) {
      res.send(500, {error: err})
    }
    VersionLocationData.find({}, (err, versions) => {
      res.send(mapListOfPOIsToDict(poi, versions))
    })
  })
})

app.get('/:key', (req, res) => {
  POI.findOne({key: req.params.key}, (err, poi) => {
    if (err) {
      return next(err)
    }
    res.send(poi)
  })
})

app.get('/versions/', (req, res) => {
  VersionLocationData.find({}, (err, versions) => {
    if (err) {
      return next(err)
    }
    res.send(mapVersionLocationData(versions))
  })
})
