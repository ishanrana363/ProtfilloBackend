const express = require('express');

const router = express.Router();

const projectController = require("../controllers/projectController");
const userController = require("../controllers/userController");
const middleware = require("../middleware/authMiddleware");

// project related api
router.post('/create', projectController.createProject );
router.put('/project-update/:id', projectController.update)

// user related api

router.post('/sing-up', userController.create );
router.post("/login", userController.login);
router.put("/profile-update", userController.update);
// router.post('/login', userController.loginUser );
// router.post('/logout', userController.logoutUser );




module.exports = router;