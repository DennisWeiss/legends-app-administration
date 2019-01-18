import {generateNewFilename} from '../../helper/helper-functions'
import fs from 'fs'

const mongoose = require('mongoose');

const restaurantContentSchema = new mongoose.Schema({
    name: String,
    info: {
        heading: {
           type: String,
           required: true
        },
        index: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        url: {
           type: String,
           required: true
        }
      }
})

restaurantContentSchema.methods.withSavedHtmlContent = function (key, lang) {
  const infoContent = this.info.url
  const infoFilename = `${key}_info_${lang}.html`
  fs.writeFileSync(`files/${infoFilename}`, infoContent)
  this.info.url = infoFilename
}

restaurantContentSchema.methods.withHtmlContent = function () {
  try {
    this.info.url = fs.readFileSync(`files/${this.info.url}`)
  } catch (err) {
    this.info.url = ''
  }

}

module.exports = mongoose.model('RestaurantContent', restaurantContentSchema);