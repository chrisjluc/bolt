var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    user_id: {
        type: String,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_date: {
        type: Date,
        default: Date.now()
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
