const projectContactModel = require("../models/projectContactModel");

class projectContactClass {
    async createProjectContact(req, res) {
        try {
            let requestBody = req.body;
            let data = await projectContactModel.create(requestBody);
            return res.status(201).send({
                msg: "Project contact created successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                msg: "Internal Server Error",
                status: "error"
            });
        }
    };
    updateStatus = async (req, res) => {
        try {
            let id = req.params.id;
            console.log(id);
            let filter = { _id: id };

            
            let updateData = await projectContactModel.findOneAndUpdate(filter, {isShow:true}, { new: true });
            return res.status(200).send({
                msg: "Project contact status updated successfully",
                status: "success",
                data: updateData
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                msg: "Internal Server Error",
                status: "error"
            });
        }
    };
}

const projectContactController = new projectContactClass();

module.exports = projectContactController;