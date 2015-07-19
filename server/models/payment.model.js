var mongoose = require('mongoose');

var paymentSchema = {
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
	},
	amount: Number,
	status: {
		type: String,
		enum: [
			'unpaid',
			'paid'
		],
		default: 'unpaid'
	},
	created_date: {
		type: Date,
		default: Date.now()
	}

};

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
