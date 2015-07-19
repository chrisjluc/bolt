'use strict';

var _ = require('lodash');
var async = require('async');
var User = require('./../../models/user.model.js');

var usersController = {
    getUsers: getUsers,
    createUser: createUser
};

module.exports = usersController;

function getUsers(req, res, next) {
    User
        .find(function(error, users) {
            if (error) {
                error = new Error("Error when finding users.");
                return next(error);
            }

            return res.status(200).send({
                users: users
            });
        })
}

function createUser(req, res, next) {
    var userEmail = req.body.email;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var password = req.body.password;

    async.waterfall([
        validateUserInfo,
        createNewUser
    ], finalCallback);

    function validateUserInfo(waterfallNext) {
        if (!validateEmail(userEmail)) {
            var error = new Error('This email is not valid.');
            return waterfallNext(error);
        }

        return waterfallNext(null);

        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }
    }

    function createNewUser(waterfallNext) {
        var newUser = new User({
            first_name: firstName,
            last_name: lastName,
            email: userEmail,
            password: password
        });

        newUser.save(function(error, savedUser) {
          if (error) {
              console.error(error);
            error = new Error('Problems saving user.');
            return waterfallNext(error);
          }

          return waterfallNext(null, savedUser);
        });
    }

    function finalCallback(error, user) {
        if (error) {
            return next(error);
        }

        res.send({
            user: user
        });
    }
}
