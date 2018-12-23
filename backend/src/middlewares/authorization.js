import {getChildPerms} from '../models/permissions.types';

module.exports = (requiredPerm) => {
    return (req, res, next) => {
   
       const userPerms = req.user.permissions;
   
        if(req.user.permissions.some((perm) => perm === 'ADMIN')) {
            next();
            return;
        }

        // check if required permission can be found for user
       if(userPerms.some((userPerm) => (userPerm === requiredPerm) || (getChildPerms(userPerm).length !== 0))) {
           next();
       } else {
           return res.status(401).send({message: 'Unauhorized access!'});
       }
   }
   }