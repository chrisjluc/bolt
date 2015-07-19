var _ = require('lodash');
var paypal = require('paypal-rest-sdk');
var User = require('../../models/user.model');

var authController = {
    authenticateUser: authenticateUser,
    getPayPalUser: getPayPalUser,
    ensureAuthenticated: ensureAuthenticated
};

module.exports = authController;

function authenticateUser(req, res, next) {
    var loginUrl = paypal.openIdConnect.authorizeUrl(
        {'scope': 'openid profile email'}
    );

    res.status(200).send(loginUrl);
}

function getPayPalUser(req, res) {
    var code = req.params.code;
    paypal.openIdConnect.tokeninfo.create(code, function (err, tokenInfo) {
        if (err){
            return res.status(400).send(err);
        }

        console.log(tokenInfo);
        paypal.openIdConnect.userinfo.get(tokenInfo.access_token, function (err, userInfo) {

            if (err) return res.status(400).send(err);

            console.log(userInfo);

            User.findOne({user_id: userInfo.user_id}, function(err, user){

                if (err) return res.status(400).send(err);

                if (user){
                    User.findByIdAndUpdate({_id: user._id}, {
                        access_token: tokenInfo.access_token,
                        refresh_token: tokenInfo.refresh_token,
                        id_token: tokenInfo.id_token,
                        token_expiry_date: Date.now() + 1000 * tokenInfo.expires_in
                    }, function(err){
                        if(err) return res.status(400).send(err);
                        console.log('Updated existing user');
                        res.status(200).send('all good');
                    });

                } else {
                    var newUser = User({
                        first_name: userInfo.given_name,
                        last_name: userInfo.family_name,
                        email: userInfo.email,
                        user_id: userInfo.user_id,
                        access_token: tokenInfo.access_token,
                        refresh_token: tokenInfo.refresh_token,
                        id_token: tokenInfo.id_token,
                        token_expiry_date: Date.now() + 1000 * tokenInfo.expires_in
                    });
                    newUser.save(function(err, user){
                        if(err) return res.status(400).send(err);
                        console.log('Created new user');
                        res.status(200).send('all good');
                    });

                }
            });
        });
    });
}

function ensureAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({message: 'Token has expired'});
    }

    req.headers.userId = payload.sub;
    User.findById(req.headers.userId, function (err, user) {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        req.headers.user = user;
        next();
    });
}

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}