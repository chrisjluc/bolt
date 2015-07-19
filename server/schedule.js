var _ = require('lodash');
var schedule = require('node-schedule');
var Event = require('./models/event.model');

module.exports = {
	init: init,
	scheduleEvent: scheduleEvent
};

function init(){
	Event.find({status: 'scheduled'}, function(err, events){
		if (err) return console.log(err);
		_(events).forEach(function(event){
			scheduleEvent(event);
		});
	});
}

function scheduleEvent(event){
	console.log(event);
	schedule.scheduleJob(event._id, event.start_date, function(){
		Event.findById(event._id, function(err, event){
			console.log(event._id + " " + event.name + " event is being triggered");
			// Charge users
		});
	});
}
