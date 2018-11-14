import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import appConf from "../../app-conf";


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

userSchema.methods.generateAuthToken = function() {
    return 'Bearer ' + jwt.sign(
        {_id: this._id, username: this.username},
        appConf.jwtPrivateKey);
}


    module.exports = mongoose.model('User', userSchema);