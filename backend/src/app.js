import express from 'express'
import bodyParser from 'body-parser'
import appConf from '../app-conf'

import VersionLocationData from './models/version-location-data'

import {mapVersionLocationData} from './mapper/version-location-data.mapper'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger'


const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('express-async-errors'); //error-handling after all routes (only for async/await)

require('./startup/db')(); // connect to db
require('./startup/reqHeader')(app); // set inital headers (e.g. CORS)
require('./startup/logging')(); //initialize logging


require('./startup/routes')(app); // initalize all routes

app.get('/versions/', async (req, res) => {
  const versions = await VersionLocationData.find({});
  res.send(mapVersionLocationData(versions));
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(appConf.serverPort);
