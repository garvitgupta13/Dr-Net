const router = require("express").Router();
const { getToken, processPayment } = require("../controllers/paymentController");
const authVerify = require('../middleware/authVerify');

router.get("/getToken", authVerify, getToken);

router.post("/", authVerify, processPayment);

module.exports = router;