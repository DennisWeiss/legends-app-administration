module.exports = (err, req, res, next) => {

    if(err.name === "ValidationError") {
        return res.status(400).send({message: err.message, error: err});
    }
    next(err);
}