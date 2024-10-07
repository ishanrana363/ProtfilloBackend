const projectContactModel = require("../models/projectContactModel");
const listService = require("../services/listService");
const sendNotificationEmail = require("../utility/emailUtility");
class projectContactClass {
    createProjectContact = async (req, res) => {
        try {
            let requestBody = req.body;

            let data = await projectContactModel.create(requestBody);
            // Send email notification
            await sendNotificationEmail(data);

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
    }

    updateStatus = async (req, res) => {
        try {
            let id = req.params.id;
            console.log(id);
            let filter = { _id: id };


            let updateData = await projectContactModel.findOneAndUpdate(filter, { isShow: true }, { new: true });
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

    deleteContactProject = async (req, res) => {
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await projectContactModel.findById(id);
            if (!data) {
                return res.status(404).send({
                    status: "fail",
                    msg: "Project contact not found"
                });
            }
            await projectContactModel.findByIdAndDelete(filter);
            return res.status(200).send({
                msg: "Project contact deleted successfully",
                status: "success",
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                msg: "Internal Server Error"
            });
        }
    };

    allProjectByUser = async (req, res) => {
        try {
            let filter = { isShow: true };
            let data = await projectContactModel.find(filter);
            return res.status(200).send({
                msg: "All project contacts fetched successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
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
                data = await projectContactModel.aggregate([
                    {
                        $facet: {
                            Total: [{ $match: searchQuery }, { $count: "count" }],
                            Rows: [{ $match: searchQuery }, { $skip: skipRow }, { $limit: perPage }]
                        }
                    }
                ]);
            } else {
                data = await projectContactModel.aggregate([
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
    }

}

const projectContactController = new projectContactClass();

module.exports = projectContactController;