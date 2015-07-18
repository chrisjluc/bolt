var mongoose = require('mongoose');

var groupSchema = {
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
};

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
