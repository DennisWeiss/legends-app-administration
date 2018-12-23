import mongoose from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');

const beaconSchema = new mongoose.Schema({
    name: String,
    beaconId:  {
        type: Number, 
        required: true,
        unique: true
    }   
    }
)

beaconSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Beacon', beaconSchema);