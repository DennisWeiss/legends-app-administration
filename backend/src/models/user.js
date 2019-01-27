import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import appConf from "../../app-conf";

const uniqueValidator = require('mongoose-unique-validator');

/**
 * 
 * @param {*} expStr time until expiration, e.g. "1h"
 * @param {*} user user-object that consists of permissions, username and _id
 */

function genAuthToken(expStr, user) {
    return 'Bearer ' + jwt.sign(
        {_id: user._id, username: user.username, permissions: user.permissions},
        appConf.jwtPrivateKey,
       {expiresIn: expStr});
}

/**
 * @attribute permissions Restricts user to certain actions he can do. They should be only set by an admin.
 */

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8 // !!! Does not validate length of original password (see register-route) !!!
    },
    permissions: {
        type: Array,
        default: []
    }

});

userSchema.methods.generateAuthToken = function(expStr) {
    return genAuthToken(expStr, this);
}

userSchema.statics.generateAuthToken = function(expStr, user) {
    return genAuthToken(expStr, user);
 }


userSchema.plugin(uniqueValidator);
  
module.exports = mongoose.model('User', userSchema);