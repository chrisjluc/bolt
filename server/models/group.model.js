var mongoose = require('mongoose');

var groupSchema = {
    name: String,
    users:  [{
        account: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: [
                'creator',
                'member'
            ]
        }
    }],
    created_date: {
      type: Date,
      default: Date.now()
    },
    updated_date: {
      type: Date,
    }
};

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
