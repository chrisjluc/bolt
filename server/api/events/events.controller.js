var _ = require('lodash');
var async = require('async');
var Event = require('../../models/event.model.js');
var schedule = require('../../schedule');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../../config/environment');
var BitlyAPI = require("node-bitlyapi");
var Bitly = new BitlyAPI({
	client_id: "c734a652d9a92ac156d27db52d199fcec5b93731",
	client_secret: "0b3156f7208c3ae8cfb11e77877fe2ebcf5e31ad"
});
Bitly.setAccessToken("e833c4f3bcac47b177de922a05117e4d7e392328");

var eventsController = {
	getEvents: getEvents,
	createEvent: createEvent,
	getEvent: getEvent,
	modifyEvent: modifyEvent,
	addUserToEvent: addUserToEvent,
	removeUserFromEvent: removeUserFromEvent,
	modifyUserInEvent: modifyUserInEvent,
	checkIn: checkIn,
	getShortLink: getShortLink
};

module.exports = eventsController;

function getEvents(req, res, next) {
	var userId = req.headers.user._id;
	var query = {
		'users.account': userId
	};

	Event
		.find(query, function (error, events) {
			if (error) {
				error = new Error('Some error when finding events.');
				return next(error);
			}

			var now = new Date();
			var twoMinAgo = new Date();
			twoMinAgo.setSeconds(twoMinAgo.getSeconds() - 5 * 60);

			_.forEach(events, function (event) {
				event._doc.allowCheckIn = now < event.start_date && event.start_date >= twoMinAgo;
			});

			return res.status(200).send(events);
		});
}

function createEvent(req, res, next) {
	var userId = req.headers.user._id;
	var eventName = req.body.eventName;
	var participants = req.body.participants;
	var startDate = req.body.startDate;
	var location = req.body.location;
	var lateFee = req.body.lateFee;
	var recurring = req.body.recurring;

	var newEvent = new Event({
		name: eventName,
		users: [{
			account: userId,
			role: 'host'
		}],
		start_date: startDate,
		location: {
			address: location.address,
			longitude: location.longitude,
			latitude: location.latitude
		},
		late_fee: lateFee,
		status: 'scheduled',
		recurring: recurring
	});

	//_.forEach(participants, function (participant) {
	//	var newParticipant = {
	//		account: participant._id,
	//		role: 'participant'
	//	};
	//	newEvent.users.push(newParticipant);
	//});

	newEvent.save(function (error, savedEvent) {
		if (error) {
			return next(error);
		}

		schedule.scheduleEvent(savedEvent);

		return res.status(200).send({
			event: savedEvent
		})
	})
}

function getEvent(req, res, next) {
	var eventId = req.params.eventId;

	async.waterfall([
		findEvent,
		generateJoinToken
	], finalCallback);

	function findEvent(waterfallNext) {
		Event
			.findById(eventId)
			.populate('users.account')
			.exec(function (error, event) {
				if (error) {
					error = new Error('Could not find event');
					return next(error);
				}

				waterfallNext(error, event);
			});
	}

	function generateJoinToken(event, waterfallNext) {
		var payload = {
			groupId: event._id,
			exp: moment().add(14, 'days').unix()
		};

		event._doc.joinToken = jwt.encode(payload, config.TOKEN_SECRET);
		waterfallNext(null, event);
	}

	function finalCallback(error, event) {
		return res.status(200).send(event);
	}
}

function modifyEvent(req, res, next) {
	var VALID_FIELDS = ['start_date', 'location', 'late_fee', 'status'];
	var requestedModification = req.body.update;
	var eventId = req.params.eventId;
	var update = {};
	var options = {'new': true, runValidators: true};
	var eventFields = _.keys(requestedModification);

	_.forEach(eventFields, function (fieldName) {
		var isValidField = _.contains(VALID_FIELDS, fieldName);
		if (isValidField) {
			update[fieldName] = requestedModification[fieldName];
		}
	});

	if (!_.isEmpty(update)) {
		update.updated_at = Date.now();
		Event
			.findByIdAndUpdate(eventId, update, options, function (error, newEvent) {
				if (error) {
					error = new Error('Problem with updating event.');
					return next(error);
				}

				res.status(200).send({
					event: newEvent
				});
			});
	} else {
		Event
			.findById(eventId, function (error, event) {
				if (error) {
					error = new Error('Problem with finding event.');
					return next(error);
				}

				res.status(200).send({
					event: event
				});
			});
	}
}

function addUserToEvent(req, res, next) {
	var eventId = req.params.eventId;
	var userToAdd = req.params.userId;
	var update = {
		$addToSet: {
			users: {
				account: userToAdd,
				role: 'participant'
			}
		}
	};
	var options = {'new': true, runValidators: true};

	Event
		.findById(eventId, function (error, event) {
			if (error || !event) {
				var notFoundError = new Error('Event not found!');
				return next(notFoundError);
			}

			var userAlreadyExists = !_.every(event.users, function (user) {
				return user.account.toString() !== userToAdd;
			});

			if (userAlreadyExists) {
				var error = new Error('User is already a participant in the event!');
				return next(error);
			}

			Event
				.findByIdAndUpdate(eventId, update, options, function (error, newEvent) {
					if (error) {
						error = new Error('Problem with updating event.');
						return next(error);
					}

					res.status(200).send({
						event: newEvent
					});
				});
		});
}

function removeUserFromEvent(req, res, next) {
	var eventId = req.params.eventId;
	var userToRemove = req.params.userId;
	var update = {
		$pull: {
			users: {
				account: userToRemove,
				role: 'participant'
			}
		}
	};
	var options = {'new': true, runValidators: true};

	Event
		.findByIdAndUpdate(eventId, update, options, function (error, newEvent) {
			if (error) {
				error = new Error('Problem with updating event.');
				return next(error);
			}

			res.status(200).send({
				event: newEvent
			});
		});
}

function modifyUserInEvent(req, res, next) {
	var VALID_FIELDS = ['role', 'on_time'];
	var userToModify = req.params.userId;
	var query = {
		'users.account': userToModify
	};
	var update = {};
	var options = {'new': true, runValidators: true};

	_.forEach(eventFields, function (fieldName) {
		var isValidField = _.contains(VALID_FIELDS, fieldName);
		if (isValidField) {
			update[fieldName] = requestedModification[fieldName];
		}
	});

	Event
		.findOneAndUpdate(query, update, options, function (error, newEvent) {
			if (error) {
				error = new Error('Problem with updating user in event.');
				return next(error);
			}

			res.status(200).send({
				event: newEvent
			});
		});
}

function checkIn(req, res) {
	var userId = req.headers.user._id;
	var userCoord = req.body.coordinates;
	var eventId = req.params.eventId;

	Event.findById(eventId, function (error, event) {
		if (error) {
			console.log(error);
			return res.status(400).send(error);
		}

		var userExists = _.filter(event.users, function (user) {
			return user.account.equals(userId);
		});

		if (userExists.length <= 0) {
			console.log('User does not exist in the event');
			return res.status(400).send('User does not exist in the event');
		}

		var eventCoord = event.location;

		if (isCoordinateWithinThreshold(userCoord, eventCoord)) {
			var query = {
				_id: event._id
			};

			Event.findOneAndUpdate(query, {
				users: _.map(event.users, function (user) {
					if (user.account.equals(userId)) {
						user.on_time = true;
					}
					return user;
				})
			}, function (err) {
				if (err) return console.error(err);
				console.log('User has checkedin');
				return res.status(200).send('User has checkedin');
			})
		} else {
			return res.status(400).send('User is not within threshold');
		}
	});
}

var degreeToMetre = 111120;
var thresholdMetres = 100;

function isCoordinateWithinThreshold(userCoord, eventCoord) {
	return Math.sqrt((Math.pow((userCoord.longitude - eventCoord.longitude), 2) +
		Math.pow((userCoord.latitude - eventCoord.latitude), 2))) * degreeToMetre < thresholdMetres;
}

function getShortLink(req, res, next) {
	var link = req.body.link;
	Bitly.shorten({longUrl: link}, function (err, results) {
		if (err) {
			return next(err);
		}

		return res.status(200).send(results)
	});

}
