const projectModel = require("../models/projectModel") ;

class ProjectController {
    async createProject(req, res) {
        try {
            let requestBody = req.body;
            let {email} = req.body ;
            let userEmail = await projectModel.findOne({email});
            if (userEmail) {
                return res.status(400).send({
                    status: "fail",
                    message: "Email already exists"
                })
            }
            else {

                let data = await projectModel.create(requestBody);
                return res.status(201).send({
                    status: "success",
                    data: data
                });
            }
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