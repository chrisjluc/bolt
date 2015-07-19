var _ = require('lodash');
var Group = require('./../../models/group.model.js');

var groupsController = {
    getGroups: getGroups,
    createGroup:createGroup
};

module.exports = groupsController;

function getGroups(req, res, next) {
    var userId = req.headers.user._id;
    var query = {
        'users.account': userId
    };

    Group
        .find(query, function(error, groups) {
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

    _.forEach(groupMembers, function(member) {
        var newMember = {
            account: member._id,
            role: 'member'
        };
        newGroup.users.push(newMember);
    });

    newGroup.save(function(error, savedGroup) {
        if (error) {
            error = new Error("Could not create new group.");
            return next(error);
        }

        return res.status(200).send({
            group: savedGroup});
    })
}
