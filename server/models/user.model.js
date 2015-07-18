var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    is_authenticated_paypal: {
        type: boolean,
        default: false
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_date: {
        type: Date,
        default: Date.now()
    },
    updated_date: {
        type: Date,
    }
    access_token: String,
    refresh_token: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
