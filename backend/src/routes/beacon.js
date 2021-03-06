const express = require("express");
const router = express.Router();

const Beacon = require("../models/beacon");
const appConf =  require("../../app-conf");


router.post('/', async (req, res, next) => {

    const beacon = new Beacon(req.body);

    await beacon.save();

    return res.status(201).send({
        message: 'Beacon successfully created!', 
        beacon: beacon
    });

})

router.put('/:beaconId', async (req, res, next) => {

    const result = await Beacon.findOneAndUpdate({beaconId: req.params.beaconId}, req.body, {new: true});

    if(!result) {
        return res.status(404).send({message: 'Update failed: Cannot find Beacon!'});
    }

    return res.status(200).send({message: 'Beacon successfully updated!', beacon: result});

})

router.delete('/:beaconId', async (req, res, next) => {

    const result = await Beacon.findOneAndRemove({beaconId: req.params.beaconId});

    if(!result) {
        return res.status(404).send({message: 'Cannot delete: Beacon not found!'});
    }

    return res.status(200).send({message: 'Beacon successfully deleted!', beacon: result});

})

router.get('/', async (req, res, next) => {
    const beacons = await Beacon.find({});
    return res.status(200).send(beacons);
})

router.get('/:beaconId', async (req, res, next) => {

    const beacon = await Beacon.findOne({beaconId: req.params.beaconId});

    if(!beacon) {
        return res.status(404).send({message: 'Cannot find beacon!'});
    }

    return res.status(200).send(beacon);

})



module.exports = router;