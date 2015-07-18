var _ = require('lodash');

var eventsController = {
    getEvents: getEvents
};

module.exports = eventsController;

function getEvents(req, res, next) {
    res.send('this route works too!');
}
