var config = require('../../config/environment');
var api_key = config.SENDGRID.key;

var sendgrid = require('sendgrid')(api_key);

var sendGridCtrl = {
	sendEmail: sendEmail
};

module.exports = sendGridCtrl;

var to = 'bryanc208@gmail.com';
var from = 'bryan.cho@uwaterloo.ca';
var subject = 'Testing SendGrid';
var text = 'Hey, testing SendGrid Emails.';

var testPayload = {
	to: to,
	from: from,
	subject: subject,
	text: text
};

function sendEmail(req, res, next) {
	var to = req.body.email || to;
	var from = req.body.fromEmail || from;
	var subject = req.body.subject || subject;
	var link = req.body.link;
	var text = (req.body.text || text) + link;

	var payload = {
		to: to,
		from: from,
		subject: subject,
		text: text
	};

	sendgrid.send(payload, function (err, json) {
		if (err) {
			console.error(err);
		}
		console.log(json);
		res.status(200).end();
	})
}
