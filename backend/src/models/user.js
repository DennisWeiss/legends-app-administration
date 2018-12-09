import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import appConf from "../../app-conf";


function genAuthToken(expStr, user) {
   return 'Bearer ' + jwt.sign(
       {_id: user._id, username: user.username, rights: user.rights},
       appConf.jwtPrivateKey,
       {expiresIn: expStr});
}

/**
 * @attribute rights Restricts user to certain actions he can do. They should be only set by an admin.
 * 
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
        minLength: 8
    },
    rights: {
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


module.exports = mongoose.model('User', userSchema);