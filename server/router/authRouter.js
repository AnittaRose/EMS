const express = require ('express');
const router = express.Router();
const authcontroller = require ('../Controller/authController');


router.post('/login',authcontroller.login);



module.exports = router