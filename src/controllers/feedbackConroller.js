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
    }
}

const feedbackController = new feedbackClass();

module.exports = feedbackController;