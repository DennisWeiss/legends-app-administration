import POI from '../models/poi.model'
import {mapListOfPOIsToDict} from '../mapper/poi.mapper'

import VersionLocationData from '../models/version-location-data'
import {applyUrlToPoi} from "../utils/helperfunctions"

const winston = require('winston');
const bcrypt = require('bcrypt');

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/authentication')
const User = require('../models/user');


router.get('/', async (req, res, next) => {

    const users = await User.find({}).select('-password');

    return res.status(200).send(users);

})

router.put('/:id', async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return res.status(404).send({message: 'Could not find user for update!'});
    }

    if(req.body.password) {
        user.password =  await bcrypt.hash(req.body.password, 10);
    }
    user.username = req.body.username;
    user.permissions = req.body.permissions;

    await user.save();

    return res.status(200).send({message: 'User successfully updated!'});
})

router.delete('/:id', async (req, res, next) => {
    const result = await User.findByIdAndDelete(req.params.id);
    if(!result) {
        return res.status(404).send({message: 'Could not delete, user not found!'});
    }
    return res.status(200).send({message: 'User successfully deleted!'});
})

module.exports = router
