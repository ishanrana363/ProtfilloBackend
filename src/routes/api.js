const express = require('express');

const router = express.Router();
//project controller
const projectController = require("../controllers/projectController");
//user controller
const userController = require("../controllers/userController");
// middleware controller
const {isAdmin,isLogIn} = require("../middleware/authMiddleware");
// projectContact Controllerr
const projectContactController = require("../controllers/projectContactController");
// skill controllers
const skillController = require("../controllers/skillController");
// service controller
const serviceController = require("../controllers/serviceController");
// feedbackController
const feedbackController = require("../controllers/feedbackConroller");
// blog controller
const blogController = require("../controllers/blogController");
// email controller
const emailController = require("../controllers/emailController");
// logo controller
const logoController = require("../controllers/logoController");
// forget password controller
const forgetPasswordController = require("../controllers/forgetPasswordController");
// stack controller
const stackController = require("../controllers/stackController");


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

// feedback api 

router.post("/feedback-create", isLogIn, feedbackController.create);
router.put("/feedback-update/:id", isLogIn, feedbackController.update);
router.delete("/feedback-delete/:id", isLogIn, feedbackController.feedbackDelete);
router.get("/feedback/:pageNo/:perPage/:searchValue", isLogIn, feedbackController.allFeedbackByAdmin);
router.get("/single-feedback/:feedbackid", feedbackController.feedbackByid );
router.get("/all-feedback", feedbackController.allFeedback);

// blog api

router.post("/blog-create", isLogIn, blogController.createBlog);
router.put("/blog-update/:id", isLogIn, blogController.updateBlog);
router.delete("/blog-delete/:id", isLogIn,blogController.deleteBlog);
router.get("/all-blog", blogController.allBlog);
router.get("/blogs/:pageNo/:perPage/:searchValue", blogController.blogByAdmin);
router.get("/single-blog/:id", blogController.singleBlog);

router.post("/send/email", emailController.sendEmailUser);

// logo related api

router.post("/logo-create", isLogIn, isAdmin, logoController.uploadLogo);
router.put("/logo-update/:id", isLogIn, isAdmin, logoController.updateLogo);
router.delete("/logo-delete/:id", isLogIn, isAdmin, logoController.deleteLogo);
router.get("/single-logo/:id", logoController.getLogoById);
router.get("/all-logo", logoController.getAllLogos);

// forget password api
router.post("/send-otp", forgetPasswordController.sendMail);
router.post("/otp-verify" , forgetPasswordController.verifyOtp);
router.post("/forget-password", forgetPasswordController.resetPassword);

// stack api

router.post("/stack-create", isLogIn, isAdmin, stackController.createStack);
router.get("/all-stack", stackController.allStack);

module.exports = router;                                                                              