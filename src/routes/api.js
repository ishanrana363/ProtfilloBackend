const express = require('express');

const router = express.Router();

const projectController = require("../controllers/projectController")

router.post('/create', projectController.createProject );





module.exports = router;