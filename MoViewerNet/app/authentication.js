const express = require('express');
const router = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken');



router.post('', async function(req, res) {
	let user = await User.findOne({$or: [{ mail: req.body.email }, { username: req.body.email }]}).exec();
	if (!user) {
		res.json({ success: false, message: 'Authentication failed. User not found.' });
		console.log("no user");
		return;
	}
	if (user.password != req.body.password) {
		console.log("no password");
		res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		return;
	}
	var payload = {
		email: user.mail,
		id: user._id	
	}
	var options = {
		expiresIn: 86400 //24 hours
	}
	var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
	res.json({
		success: true,
		message: 'Enjoy your token!',
		token: token,
		email: user.mail,
		id: user._id,
		self: "api/v1/" + user._id
	});
});



module.exports = router;