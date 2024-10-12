const feedbackModel = require("../models/feedbackModel");

class feedbackClass {
    create = async (req,res)=>{
        try{
            let requestBody = req.body;
            let data = await feedbackModel.create(requestBody);
            return res.status(201).send({
                status: "success",
                message: "Feedback created successfully",
                data: data
            })
        }catch(err){
            return res.status(500).send({
                status: "error",
                message: "Failed to create feedback",
                error: err.message
            })
        }
    };
    update = async (req,res)=>{
        try{
            let id = req.params.id;

            let requestBody = req.body;

            let filter = { _id: id };

            let update = requestBody;

            let data = await feedbackModel.findByIdAndUpdate(filter, update, { new: true });

            if(!data){
                return res.status(404).send({
                    status: "error",
                    message: "Feedback not found"
                })
            }

            return res.status(200).send({
                status: "success",
                message: "Feedback updated successfully",
                data: data
            })

        }catch(err){
            return res.status(500).send({
                status: "error",
                message: "Failed to update feedback",
                error: err.message
            })
        }
    };
    feedbackDelete = async (req, res) => {
        try {
            let id = req.params.id;

            let filter = { _id: id };

            let data = await feedbackModel.findByIdAndDelete(filter);

            if (!data) {
                return res.status(404).send({
                    status: "error",
                    message: "Feedback not found"
                });
            }

            return res.status(200).send({
                status: "success",
                message: "Feedback deleted successfully",
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: error.toString()
            });
        }
    };
    allFeedbackByAdmin = async (req, res) => {
        try {

            let pageNo = Number(req.params.pageNo);

            let perPage = Number(req.params.perPage);

            let searchValue = req.params.searchValue ? String(req.params.searchValue) : "";

            let skipRow = (pageNo - 1) * perPage;

            let data;
            if (searchValue !== "0" && searchValue !== "") {
                let searchRegex = { "$regex": searchValue, "$options": "i" };
                let searchQuery = { $or: [{ name: searchRegex }, { feedback: searchRegex }] };
                data = await feedbackModel.aggregate([
                    {
                        $facet: {
                            Total: [{ $match: searchQuery }, { $count: "count" }],
                            Rows: [{ $match: searchQuery }, { $skip: skipRow }, { $limit: perPage }]
                        }
                    }
                ]);
            } else {
                data = await feedbackModel.aggregate([
                    {
                        $facet: {
                            Total: [{ $count: "count" }],
                            Rows: [{ $skip: skipRow }, { $limit: perPage }]
                        }
                    }
                ]);
            }
    
            res.status(200).send({
                msg: "Feedback fetched successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            res.status(500).send({
                msg: "Failed to fetch feedback",
                status: "fail",
                error: error.toString()
            });
        }
    };
    feedbackByid = async (req,res)=>{
        try {
            let id = req.params.feedbackid;
            let data = await feedbackModel.findById(id);
            if (!data) {
                return res.status(404).send({
                    msg: "Feedback not found",
                    status: "fail"
                });
            }
            res.status(200).send({
                msg: "Feedback fetched successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            })
        };
    };

}

const feedbackController = new feedbackClass();

module.exports = feedbackController;