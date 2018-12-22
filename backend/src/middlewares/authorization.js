const PERMISSIONS = require('../models/permissions.types'); 

module.exports = (requiredPerm) => {
    return (req, res, next) => {
   
       const userPerms = req.user.permissions;
   
        if(req.user.permissions[0] === 'ADMIN') {
            next();
            return;
        }

       if(userPerms.some((userPerm) => userPerm === requiredPerm || PERMISSIONS.hasChildPerm(userPerm, requiredPerm))) {
           next();
       } else {
           return res.status(401).send({message: 'Unauhorized access!'});
       }
   }
   }