const skillModel = require("../models/skillModel");

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
    skillUpdate = async (req,res)=>{
        try{
            let id = req.params.id;
            let requestBody = req.body;
            let filter = { _id: id };
            let update = requestBody;
            let data = await skillModel.findById(id);
            if(!data){
                return res.status(404).send({
                    status: "fail",
                    message: "Skill not found"
                });
            }
            let skillUpdate = await skillModel.findOneAndUpdate(filter, update, {new: true});
            return res.status(200).send({
                status: "success",
                message: "Skill updated successfully",
                data: skillUpdate
            })
        } catch(err){
            return res.status(500).send({
                status: "fail",
                message: "Failed to update skill",
                error: err.message
            })
        }
    };
    skiillDelete = async (req, res) =>{
        try{
            let id = req.params.id;
            let filter = { _id: id };

            let data = await skillModel.findById(id);

            if(!data){
                return res.status(404).send({
                    status: "fail",
                    message: "Skill not found"
                });
            }
            let skillDelete = await skillModel.findByIdAndDelete(filter);

            return res.status(200).send({
                status: "success",
                message: "Skill deleted successfully",
                data: skillDelete
            });

        } catch(err){
            return res.status(500).send({
                status: "fail",
                message: "Failed to delete skill",
                error: err.message
            })
        }
    };
    allSkills = async (req, res) => {
        try{
            let data = await skillModel.find({});
            return res.status(200).send({
                status: "success",
                message: "Skills fetched successfully",
                data: data
            });
        } catch(err){
            return res.status(500).send({
                status: "fail",
                message: "Failed to fetch skills",
                error: err.message
            });
        }
    };
}

const skillController = new skillClass();

module.exports = skillController;