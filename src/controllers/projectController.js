const projectModel = require("../models/projectModel") ;

class ProjectController {
    async createProject(req, res) {
        try {
            let requestBody = req.body;
            let data = await projectModel.create(requestBody);
            return res.status(201).send({
                msg: "Project created successfully",
                status: "success",
                data : data
            });
        }catch (e) {
            return res.status(500).send({
                status: "fail",
                msg:e.toString()
            });
        }
    };
}

const projectController = new ProjectController();

module.exports = projectController;