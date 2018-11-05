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


app.post('/', (req, res) => {
  const poi = new POI(req.body)
  poi.save(err => {
    if (err) {
      return next(err)
    }
    VersionLocationData.count({type: poi.type}, (err, count) => {
      if (count === 0) {
        const versionLocationData = new VersionLocationData({
          type: poi.type,
          version: `v${poi.type.substr(0, 1)}.1.1`
        })
        versionLocationData.save(err => err && next(err))
      } else {
        // TODO: proper implementation
        // VersionLocationData.findOneAndUpdate({type: poi.type}, (err, versionLocationData) => {
        //   if (err) {
        //     return next(err)
        //   }
        //   const updatedVersionLocationData = new VersionLocationData({
        //     type: versionLocationData.type,
        //     version: increaseVersion(versionLocationData.version)
        //   })
        //   updatedVersionLocationData.save(err => err && next(err))
        // })
      }
    })
    res.send('POI created successfully')
  })
})

app.get('/', (req, res) => {
  POI.find({}, (err, poi) => {
    if (err) {
      return next(err)
    }
    res.send(mapListOfPOIsToDict(poi))
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
