const mongoose = require('mongoose');

const restaurantContentSchema = new mongoose.Schema({
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

module.exports = mongoose.model('RestaurantContent', restaurantContentSchema);