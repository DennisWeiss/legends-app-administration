import {generateNewFilename} from '../../helper/helper-functions'

const mongoose = require('mongoose');

const sightContentSchema = new mongoose.Schema({
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

sightContentSchema.methods.withSavedHtmlContent = function (key, lang) {
  const infoContent = this.info.url
  const infoFilename = `${generateNewFilename(`${key}_${field}_${lang}`)}.html`
  fs.writeFile(`files/${infoFilename}`, infoContent)
  this.info.url = infoFilename
}

module.exports = mongoose.model('SightContent', sightContentSchema);