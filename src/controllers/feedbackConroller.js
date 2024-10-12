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
}

const feedbackController = new feedbackClass();

module.exports = feedbackController;