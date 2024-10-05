const express = require('express');

const router = express.Router();

const projectController = require("../controllers/projectController");
const userController = require("../controllers/userController");

router.post('/create', projectController.createProject );

// user related api

router.post('/sing-up', userController.create );
// router.post('/login', userController.loginUser );
// router.post('/logout', userController.logoutUser );




module.exports = router;