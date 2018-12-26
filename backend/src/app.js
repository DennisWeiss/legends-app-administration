import express from 'express'
import bodyParser from 'body-parser'
import appConf from '../app-conf'

import VersionLocationData from './models/version-location-data'

import {mapVersionLocationData} from './mapper/version-location-data.mapper'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './openapi'

import winston from 'winston';

import cors from 'cors';


const app = express()
const router = express.Router()

app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}))
app.use(cors())

app.use(express.static('files'));

require('express-async-errors'); //error-handling after all routes (only for async/await)

require('./startup/db')(); // connect to db
//require('./startup/reqHeader')(app); // set inital headers (e.g. CORS)
require('./startup/logging')(); //initialize logging


require('./startup/routes')(app); // initalize all routes

app.get('/versions/', async (req, res) => {
  const versions = await VersionLocationData.find({});
  res.send(mapVersionLocationData(versions));
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(appConf.serverPort, function() {
  winston.log('info', `Server running on ${appConf.serverPort}`);
});
