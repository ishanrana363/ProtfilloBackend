const skillModel = require("../models/skill");

class skillClass {
    skillCreate = async (req,res)=>{
        try{
            let requestBody = req.body;
            let data = await skillModel.create(requestBody);
            return res.status(201).send({
                status: "success",
                message: "Skill created successfully",
                data: data
            })
        } catch(err){
            return res.status(500).send({
                status: "fail",
                message: "Failed to create skill",
                error: err.message
            })
        }
    };
}

const skillController = new skillClass();

module.exports = skillController;