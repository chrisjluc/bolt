var _ = require('lodash');
var schedule = require('node-schedule');
var Event = require('./models/event.model');
var Payment = require('./models/payment.model');

module.exports = {
	init: init,
	scheduleEvent: scheduleEvent,
};

var recurringSeconds = {
	Minutely: 60,
	Daily: 24 * 60 * 60,
	Weekly: 7 * 24 * 60 * 60,
	Monthly: 30 * 24 * 60 * 60,
	Yearly: 365 * 24 * 60 * 60
};

function init() {
	Event.find({status: 'scheduled', start_date: {$gte: Date.now()}}, function (err, events) {
		if (err) return console.log(err);
		_.forEach(events, function (event) {
			scheduleEvent(event);
		});
	});
}

function scheduleEvent(event) {
	console.log(event);
	schedule.scheduleJob(event._id, event.start_date, function () {
		Event.findById(event._id, function (err, event) {
			console.log(event._id + " " + event.name + " event is being triggered");

			_.forEach(event.users, function(user){
        if(!user.on_time){
          var newPayment = new Payment({
            users: user._id,
            event: event._id,
            amount: event.lateFee,
            status: 'unpaid'
          });
          newPayment.save();
        }
			});


			// schedule recurring events again
			scheduledJobs[event._id] = null;
			var query = {
				_id: event._id
			};
			var update = {
				start_date: event.start_date + recurringSeconds[event.recurring]
			};
			var option = {
				'new': true
			};
			event.findOneAndUpdate(query, update, option
				, function(err, updatedEvent){
				if (err) return console.error(err);
				scheduleEvent(updatedEvent);
			});
		});
	});
}
