const stackModel = require("../models/stackModel");

exports.createStack = async (req,res)=>{
    try {
        const reqBody = req.body;
        const data = await stackModel.create(reqBody);
        return res.status(201).send({
            msg: "Stack created successfully",
            status: "success",
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "An error occurred while creating the stack",
            status: "error",
            error: error.message
        });
    }
};

exports.allStack = async (req,res)=>{
    try {
        let data = await stackModel.find({});
        return res.status(200).send({
            msg: "Stacks fetched successfully",
            status: "success",
            data: data
        });
    } catch (error) {
        return res.status(500).send({
            status: "fail",
            msg: "Failed to fetch stacks",
            error: error.message
        });
    }
};