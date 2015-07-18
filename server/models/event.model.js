var mongoose = require('mongoose');

var eventSchema = {
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
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
    late_users: [Schema.Types.ObjectId]
};

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
