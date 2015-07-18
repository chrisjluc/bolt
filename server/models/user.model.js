var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    paypal_account: String,
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
});

var User = mongoose.model('User', userSchema);

module.exports = User;
