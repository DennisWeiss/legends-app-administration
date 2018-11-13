import express from 'express'
import bodyParser from 'body-parser'
import appConf from '../app-conf'

import VersionLocationData from './models/version-location-data'

import {mapVersionLocationData} from './mapper/version-location-data.mapper'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger'


const app = express()
const router = express.Router()

app.listen(appConf.serverPort)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./startup/db')(); // connect to db
require('./startup/reqHeader')(app); // set inital headers (e.g. CORS)
require('./startup/logging')(); //initialize logging

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

require('./startup/routes')(app); // initalize all routes


app.get('/versions/', (req, res) => {
  VersionLocationData.find({}, (err, versions) => {
    if (err) {
      return next(err)
    }
    res.send(mapVersionLocationData(versions))
  })
})
