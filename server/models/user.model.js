var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    user_id: {
        type: String,
        required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_date: {
        type: Date,
        default: Date.now()
    },
    token_expiry_date: {
        type: Date
    },
    access_token: String,
    refresh_token: String,
    id_token: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
