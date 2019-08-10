var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControlers')
const SessionControllers = require('../controllers/SessionControllers')
router.route('/')
    .post(userController.create, 
        SessionControllers.generateToken, 
        SessionControllers.sendToken)
    //get( userController.destroyAll)

module.exports = router;
