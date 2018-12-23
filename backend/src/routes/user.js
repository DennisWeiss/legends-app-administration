const winston = require('winston');
const bcrypt = require('bcrypt');

const express = require('express')
const router = express.Router()

const User = require('../models/user');

import { PERMISSIONS } from '../models/permissions.types';

/**
 * Routes for manipulating users.
 * Are only accessible by admins (authentication + permission, see under startup/routes).
 */



router.get('/', async (req, res, next) => {

    const users = await User.find({}).select('-password');

    return res.status(200).send({
        users: users,
        permissions: Array.from(PERMISSIONS.keys())
    });

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
