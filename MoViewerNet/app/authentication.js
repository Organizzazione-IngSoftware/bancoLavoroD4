const express = require('express');
const router = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken');



router.post('/auth', async function(req, res) {
    let myUser = await User.findOne({ $or: [{ mail: req.body.keyword }, { username: req.body.keyword }] }).exec();
    if (!myUser) res.json({success: false, message: 'User not found'});
    else if (myUser.password != req.body.password) res.json({success: false, message: 'Wrong password'});

    var payload = { email: myUser.mail, id: myUser.id, other_data: encrypted_in_the_token };
    var options = { expiresIn: 86400};
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    res.json({ success: true, message: 'Enjoy your token!',
        token: token, email: myUser.mail, id: myUser.id, self: "api/v1/" + myUser.id
    });
});

module.exports = router;