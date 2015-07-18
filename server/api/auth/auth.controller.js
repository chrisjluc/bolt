var _ = require('lodash');
var paypal = require('paypal-rest-sdk');

var authController = {
    authenticateUser: authenticateUser,
    getPayPalUser: getPayPalUser
};

module.exports = authController;

function authenticateUser(req, res, next) {
    var loginUrl = paypal.openIdConnect.authorizeUrl(
        {'scope': 'openid'}
    );

    res.status(200).send(loginUrl);
}

function getPayPalUser(req, res) {

}