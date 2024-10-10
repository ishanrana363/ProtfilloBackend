const serviceModel = require("../models/serviceModel");


class serviceClass {
    async createService(req, res) {
        try {
            let requestBody = req.body;
            let data = await serviceModel.create(requestBody);
            return res.status(201).send({
                msg: "Service created successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                msg: "Failed to create service",
                status: "error",
                data: null
            });
        } 
    };
    
}

const serviceController = new serviceClass();


module.exports = serviceController;