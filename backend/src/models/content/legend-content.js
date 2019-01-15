import {generateNewFilename} from '../../helper/helper-functions'
import fs from 'fs'


const mongoose = require('mongoose')

const legendContentSchema = new mongoose.Schema({
  name: String,
  explored: {
    heading: { type: String, required: true },
    index: {type: Number, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true }
  },
  preview: {
    heading: { type: String, required: true },
    index: {type: Number, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true }
  },
  puzzle: {
    hints: [
      {
        index: { type: Number, required: true },
        url: { type: String, required: true }
      }
    ],
    heading: { type: String, required: true },
    index: {type: Number, required: true },
    type: { type: String, required: true }
  }
})

legendContentSchema.methods.withSavedHtmlContent = function (key, lang) {
  const fields = ['explored', 'preview']
  fields.forEach(field => {
    const fieldContent = this[field].url
    const fieldFilename = `${generateNewFilename(`${key}_${field}_${lang}`)}.html`
    fs.writeFileSync(`files/${fieldFilename}`, fieldContent)
    this[field].url = fieldFilename
  })

  console.log(this)

  this.puzzle.hints = this.puzzle.hints.map(hint => {
    const hintFilename = `${generateNewFilename(`${key}_hint_${lang}.html`)}.html`
    fs.writeFileSync(`files/${hintFilename}`, hint)
    return hintFilename
  })
}

module.exports = mongoose.model('LegendContent', legendContentSchema);