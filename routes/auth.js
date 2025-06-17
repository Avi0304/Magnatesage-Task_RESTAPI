const express = require('express');
const {registerController, loginController, forgetPassword, resetPassword} = require("../controllers/authController");

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/forget-password', forgetPassword);

router.post("/reset-password", resetPassword);

module.exports = router;