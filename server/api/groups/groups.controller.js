var _ = require('lodash');

var groupsController = {
    getGroups: getGroups
};

module.exports = groupsController;

function getGroups(req, res, next) {
    res.send('this route works');
}
