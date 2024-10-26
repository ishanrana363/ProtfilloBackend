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

exports.updateLogo = async (req,res)=>{
    try {
        let id = req.params.id;
        let requestBody = req.body;
        let filter = { _id: id };
        let update = requestBody;
        let options = { new: true };
        let updatedData = await logoModel.findOneAndUpdate(filter, update, options);
        if (!updatedData) {
            return res.status(404).send({
                status: "fail",
                msg: "Logo not found"
            });
        }
        return res.status(200).send({
            msg: "Logo updated successfully",
            status: "success",
            data: updatedData
        });
    } catch (error) {
        return res.status(500).send({
            status: "fail",
            msg: "Failed to update logo",
            error: error.message
        });
    }
};

exports.deleteLogo = async (req,res)=>{
    try {
        let id = req.params.id;
        let deletedData = await logoModel.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).send({
                status: "fail",
                msg: "Logo not found"
            });
        }
        return res.status(200).send({
            msg: "Logo deleted successfully",
            status: "success"
        });
    } catch (error) {
        return res.status(500).send({
            status: "fail",
            msg: "Failed to delete logo",
            error: error.message
        });
    }
};

