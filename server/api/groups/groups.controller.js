var _ = require('lodash');
var Group = require('./../../models/group.model.js');

var groupsController = {
    getGroups: getGroups,
    createGroup: createGroup,
    addUserToGroup: addUserToGroup,
    removeUserFromGroup: removeUserFromGroup,
    getGroup: getGroup
};

module.exports = groupsController;

function getGroups(req, res, next) {
    var userId = req.headers.user._id;
    var query = {
        'users.account': userId
    };

    Group
        .find(query, function (error, groups) {
            if (error) {
                error = new Error('Some error when finding groups.');
                return next(error);
            }

            return res.status(200).send(groups);
        });
}

function createGroup(req, res, next) {
    var groupName = req.body.groupName;
    var groupMembers = req.body.groupMembers;
    var userId = req.headers.user._id;

    var newGroup = new Group({
        name: groupName,
        users: [{
            account: userId,
            role: 'creator'
        }]
    });

    _.forEach(groupMembers, function (member) {
        var newMember = {
            account: member._id,
            role: 'member'
        };
        newGroup.users.push(newMember);
    });

    newGroup.save(function (error, savedGroup) {
        if (error) {
            error = new Error("Could not create new group.");
            return next(error);
        }

        return res.status(200).send({
            group: savedGroup
        });
    })
}

function addUserToGroup(req, res, next) {
    var groupId = req.params.groupId;
    var userToAdd = req.params.userId;
    var update = {
        $addToSet: {
            users: {
                account: userToAdd,
                role: 'member'
            }
        }
    };
    var options = {'new': true, runValidators: true};

    Group
        .findByIdAndUpdate(groupId, update, options, function (error, newEvent) {
            if (error) {
                error = new Error('Problem with updating event.');
                return next(error);
            }

            res.status(200).send({
                event: newEvent
            });
        });
}

function removeUserFromGroup(req, res, next) {
    var groupId = req.params.groupId;
    var userToRemove = req.params.userId;
    var update = {
        $pull: {
            users: {
                account: userToRemove,
                role: 'member'
            }
        }
    };
    var options = {'new': true, runValidators: true};

    Group
        .findByIdAndUpdate(groupId, update, options, function (error, newEvent) {
            if (error) {
                error = new Error('Problem with updating event.');
                return next(error);
            }

            res.status(200).send({
                event: newEvent
            });
        });
}

function getGroup(req, res, next) {
    var groupId = req.params.id;

    Group.findById(groupId, function(error, group) {
        if (error) {
            error = new Error('Could not find group');
            return next(error);
        }
}
        return res.status(200).send(group);
    });
}
