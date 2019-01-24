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
    const fieldFilename = `${key}_${field}_${lang}.html`
    fs.writeFileSync(`files/${fieldFilename}`, fieldContent)
    this[field].url = fieldFilename
  })

  this.puzzle.hints = this.puzzle.hints.map(hint => {
    const hintFilename = `${key}_hint_${lang}_${hint.index}.html`
    fs.writeFileSync(`files/${hintFilename}`, hint.url)
    hint.url = hintFilename;
    return hint;
  })
}

legendContentSchema.methods.withHtmlContent = function () {
  const fields = ['explored', 'preview']
  fields.forEach(field => {
    try {
      this[field].url = fs.readFileSync(`files/${this[field].url}`)
    } catch (err) {
      this[field].url = ''
    }
  })

  this.puzzle.hints = this.puzzle.hints.map(hint => {
    try {
      hint.url = fs.readFileSync(`files/${hint.url}`)
    } catch (err) {
      //throw new Error(`Could not read hint from file for '${this.name}'`)
      hint.url = '';
    }
    return hint;
  })

}

module.exports = mongoose.model('LegendContent', legendContentSchema);