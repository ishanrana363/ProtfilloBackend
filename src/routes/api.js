const express = require('express');

const router = express.Router();

const projectController = require("../controllers/projectController");
const userController = require("../controllers/userController");
const {isAdmin,isLogIn} = require("../middleware/authMiddleware");

// project related api
router.post('/create', isLogIn,isAdmin, projectController.createProject );
router.put('/project-update/:id',isLogIn,isAdmin,projectController.update);
router.delete("/project-delete/:id",isLogIn, isAdmin, projectController.projectDelete);

// user related api

router.post('/sing-up', userController.create );
router.post("/login", userController.login);
router.put("/profile-update", isLogIn , isAdmin , userController.update);
router.get("/admin-profile", isLogIn, isAdmin, userController.adminProfile);




module.exports = router;