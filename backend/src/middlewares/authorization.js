module.exports = (permission) => {
    return (req, res, next) => {
   
       const permissions = req.user.permissions;
   
        if(req.user.permissions[0] === 'ADMIN') {
            next();
            return;
        }

       if(permissions.some((perm) => perm === permission)) {
           next();
       } else {
           return res.status(401).send({message: 'Unauhorized access!'});
       }
   }
   }