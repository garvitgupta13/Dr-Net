module.exports = async (req, res, next) => {

    if (req.user.role !== 'patient')
        return res.status(403).send("ACCESS DENIED!! This route is for patient only")
    next();
}