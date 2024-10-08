const express = require('express');

const router = express.Router();

const projectController = require("../controllers/projectController");
const userController = require("../controllers/userController");
const {isAdmin,isLogIn} = require("../middleware/authMiddleware");
const projectContactController = require("../controllers/projectContactController");
const skillController = require("../controllers/skillController");
const serviceController = require("../controllers/serviceController");

// project related api
router.post('/project-create', isLogIn,isAdmin, projectController.createProject );
router.put('/project-update/:id',isLogIn,isAdmin,projectController.update);
router.delete("/project-delete/:id",isLogIn, isAdmin, projectController.projectDelete);
router.get("/sigle-project/:id" ,isLogIn, isAdmin, projectController.singleProject);
router.get("/all-project-by-admin/:pageNo/:perPage/:searchValue", isLogIn,isAdmin ,projectController.allProjectByAdmin )
router.get("/all-projects", projectController.allProject);

// user related api

router.post('/sing-up', userController.create );
router.post("/login", userController.login);
router.put("/profile-update", isLogIn , isAdmin , userController.update);
router.get("/admin-profile", isLogIn, isAdmin, userController.adminProfile);

// projectContack api

router.post("/project-contact", projectContactController.createProjectContact);
router.put("/project-contact/update/:id", isLogIn, isAdmin,  projectContactController.updateStatus);
router.delete("/project-contact-delete/:id", isLogIn, isAdmin, projectContactController.deleteContactProject);
router.get("/project-contact-user", projectContactController.allProjectByUser);
router.get("/all-contact-projects/:pageNo/:perPage/:searchValue", isLogIn, isAdmin, projectContactController.allProjectByAdmin);

// skill api

router.post("/skill-create", isLogIn, isAdmin, skillController.skillCreate );
router.put("/skill-update/:id", isLogIn, isAdmin, skillController.skillUpdate );
router.delete("/skill-delete/:id", isLogIn, isAdmin, skillController.skiillDelete);
router.get("/all-skill", skillController.allSkills);
router.get("/all-skill-by-admin/:pageNo/:perPage/:searchValue", isLogIn,isAdmin , skillController.allSkillByAdmin);
router.get("/single-skill/:id", skillController.singleSkill);

// service api

router.post("/service-create", isLogIn, isAdmin, serviceController.createService);
router.put("/service-update/:id", isLogIn, isAdmin, serviceController.updateService);
router.delete("/service-delete/:id", isLogIn, isAdmin, serviceController.deleteService);
router.get("/all-service", serviceController.allService);
router.get("/all-service-by-admin/:pageNo/:perPage/:searchValue" , isLogIn, isAdmin, serviceController.allServiceByAdmin);
router.get("/single-service/:id", serviceController.serviceById);


module.exports = router;