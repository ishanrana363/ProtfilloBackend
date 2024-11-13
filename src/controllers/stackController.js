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