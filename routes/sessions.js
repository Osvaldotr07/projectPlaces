const express = require('express')
const router = express.Router();
const session = require('../controllers/SessionControllers')
router.route('/')
    .post(session.authenticate, 
        session.generateToken, 
        session.sendToken);


module.exports = router;