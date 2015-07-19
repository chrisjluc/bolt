var mongoose = require('mongoose');

var paymentSchema = {
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	eventId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
	},
	eventName: String,
	location: {
		address: String,
		coordinates: {
			longitude: Number,
			latitude: Number
		}
	},
	amount: Number,
	status: {
		type: String,
		enum: [
			'unpaid',
			'paid'
		]
	},
	created_date: {
		type: Date,
		default: Date.now()
	}
};

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
