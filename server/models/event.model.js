var mongoose = require('mongoose');

var eventSchema = {
    name: String,
    users:  [{
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: [
              'host',
              'participant'
            ]
        },
        on_time: {
            type: Boolean,
            default: false
        }
    }],
    start_date: Date,
    location: {
        address: String,
        coordinates: {
            longitude: Number,
            latitude: Number
        }
    },
    late_fee: Number,
    status: {
        type: String,
        enum: [
            'scheduled',
            'finished',
            'cancelled'
        ]
    },
    recurring: {
        type: String,
        enum: [
            'Daily',
            'Weekly',
            'Monthly',
            'Yearly'
        ]
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    updated_date: {
        type: Date
    },
    payout_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
};

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
