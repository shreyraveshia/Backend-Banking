const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();
// is router ki help se hum age api create karenge


// POST:- api/auth/register-- ye route hoga user registration ke liye, 
// aur jab bhi koi is route pe request karega to registerUser function call hoga, 
// jo ki authController me defined hai (jo ki humne abhi banaya hai, aur usme hum ye batayenge ki jab koi user register karne ki koshish karega to kya hoga, etc.)
router.post("/register", authController.userRegisterController);

/* POST:- api/auth/login--  */

router.post("/login", authController.userLoginController);


module.exports = router;