var mongoose = require('mongoose');

var eventSchema = {
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
        }
    }],
    start_date: Date,
    location: String,
    late_fee: Number,
    status: {
        type: String,
        enum: [
            'scheduled',
            'in-progress',
            'finished',
            'cancelled'
        ]
    },
    late_users: [mongoose.Schema.Types.ObjectId],
    created_date: {
        type: Date,
        default: Date.now()
    },
    updated_date: {
        type: Date
    }
};

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
