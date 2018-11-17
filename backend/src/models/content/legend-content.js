const mongoose = require('mongoose')

const legendContentSchema = new mongoose.Schema({
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

module.exports = mongoose.model('LegendContent', legendContentSchema);