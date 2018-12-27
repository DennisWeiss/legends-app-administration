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

module.exports = mongoose.model('SightContent', sightContentSchema);