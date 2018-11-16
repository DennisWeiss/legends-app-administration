module.exports = (req, res, next) => {

    const rights = req.user.rights;

    if(rights.some((right) => right === 'admin')) {
        next();
    } else {
        return res.status(401).send({message: 'Unauhorized access!'});
    }

}