const logoModel = require("../models/logoModel");


exports.uploadLogo = async (req,res)=>{
    try {
        const reqBody = req.body;
        const data = await logoModel.create(reqBody);
        return res.status(201).send({
            msg: "Logo uploaded successfully",
            status: "success",
            data: data
        });
    } catch (error) {
        return res.status(500).send({
            status: "fail",
            msg: "Failed to upload logo",
            error: error.message
        });
    }
};

