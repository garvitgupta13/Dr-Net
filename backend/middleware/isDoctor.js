module.exports = async (req, res, next) => {

    if (req.user.role !== 'doctor')
        return res.status(403).send("ACCESS DENIED!! This route is for doctors only")
    next();
}