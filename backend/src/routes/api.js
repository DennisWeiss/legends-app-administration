const express = require("express");
const router = express.Router();

const User = require("../models/user");
const POI = require("../models/poi.model");
const appConf =  require("../../app-conf");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/authentication')


router.get('/poi', async () => {

})


exports.module = router;