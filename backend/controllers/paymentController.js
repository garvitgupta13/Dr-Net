const braintree = require("braintree")
const config = require("../config")

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: config.BRAINTREE_MERCHANT_ID,
    publicKey: config.BRAINTREE_PUBLIC_KEY,
    privateKey: config.BRAINTREE_PRIVATE_KEY
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.fee;
    gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,

            options: {
                submitForSettlement: true
            }
        },
        function (err, result) {
            if (err) {
                return res.status(500).json(error);
            } else {
                return res.json(result);
            }
        }
    );
};


