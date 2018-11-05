import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import appConf from './app-conf'

const POI = require('./models/poi.model')


const app = express()

app.listen(appConf.serverPort)


mongoose.connect(appConf.mongoDbUrl, { useNewUrlParser: true })
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
    res.send('POI created successfully')
  })
})

