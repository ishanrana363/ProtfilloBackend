const projectModel = require("../models/projectModel");
const listService = require("../services/listService");

class ProjectController {
    async createProject(req, res) {
        try {
            let requestBody = req.body;
            let data = await projectModel.create(requestBody);
            return res.status(201).send({
                msg: "Project created successfully",
                status: "success",
                data: data
            });
        } catch (e) {
            return res.status(500).send({
                status: "fail",
                msg: e.toString()
            });
        }
    };
    update = async (req, res) => {
        try {

            let id = req.params.id;
            let filter = { _id: id };
            let requestBody = req.body;
            let update = requestBody;
            let data = await projectModel.findById(id);
            if (!data) {
                return res.status(404).send({ msg: "Project not found" });
            }
            let project = await projectModel.findOneAndUpdate(filter, update, { new: true });
            return res.status(200).send({
                msg: "Project updated successfully",
                status: "success",
                data: project
            });

        } catch (e) {
            return res.status(500).send({
                status: "fail",
                msg: e.toString()
            });
        }
    };
    projectDelete = async (req, res) => {
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await projectModel.findByIdAndDelete(filter);
            if (!data) {
                return res.status(404).send({ msg: "Project not found" });
            }
            return res.status(200).send({
                msg: "Project deleted successfully",
                status: "success",
                data: data
            });
        } catch (e) {
            return res.status(500).send({
                status: "fail",
                msg: e.toString()
            });
        }
    };
    singleProject = async (req, res) => {
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await projectModel.findById(filter);
            if (!data) {
                return res.status(404).send({ msg: "Project not found" });
            }
            return res.status(200).send({
                msg: "Project fetched successfully",
                status: "success",
                data: data
            });

        } catch (error) {
            return {
                status: "fail",
                msg: error.toString()
            }
        }
    };
    allProjectByAdmin = async (req, res) => {
        try {
            let pageNo = Number(req.params.pageNo);
            let perPage = Number(req.params.perPage);
            let searchValue = req.params.searchValue ? String(req.params.searchValue) : "";
            let skipRow = (pageNo - 1) * perPage;
            let data;
            if (searchValue !== "0" && searchValue !== "") {
                let searchRegex = { "$regex": searchValue, "$options": "i" };
                let searchQuery = { $or: [{ name: searchRegex }, { url: searchRegex }] };
                data = await projectModel.aggregate([
                    {
                        $facet: {
                            Total: [{ $match: searchQuery }, { $count: "count" }],
                            Rows: [{ $match: searchQuery }, { $skip: skipRow }, { $limit: perPage }]
                        }
                    }
                ]);
            } else {
                data = await projectModel.aggregate([
                    { $match: { email: email } },
                    {
                        $facet: {
                            Total: [{ $count: "count" }],
                            Rows: [{ $skip: skipRow }, { $limit: perPage }]
                        }
                    }
                ]);
            }
    
            res.status(200).send({
                msg: "Projects fetched successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            res.status(500).send({
                msg: "Failed to fetch projects",
                status: "fail",
                error: error.toString()
            });
        }
    };
    allProject = async (req, res) => {
        let name = req.params.searchValue;
        try {
            let dataSearch = { $regex: name, $options: 'i' }; 
            let searchQuery = { $or: [{ name: dataSearch }] };
    
            let data = await projectModel.find(searchQuery);
            res.status(200).send({
                msg: "Projects fetched successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };
    
    
}

const projectController = new ProjectController();

module.exports = projectController;