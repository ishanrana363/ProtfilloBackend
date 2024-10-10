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
    async updateService(req, res) {
        try {
            let id = req.params.id;

            let requestBody = req.body;

            let filter = { _id: id };

            let update = requestBody;

            let options = { new: true };

            let data = await serviceModel.findOneAndUpdate(filter, update, options);
            if (!data) {
                return res.status(404).send({
                    msg: "Service not found",
                    status: "fail",
                    data: null
                });
            }
            return res.status(200).send({
                msg: "Service updated successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                msg: "Failed to update service",
                status: "error",
                data: null
            });
        }
    };
    async deleteService(req, res) {
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await serviceModel.findByIdAndDelete(filter);
            if (!data) {
                return res.status(404).send({
                    msg: "Service not found",
                    status: "fail",
                });
            }
            return res.status(200).send({
                msg: "Service deleted successfully",
                status: "success",
                data: null
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            })
        }
    };
    async allService(req, res) {
        try {
            let data = await serviceModel.find();
            return res.status(200).json({
                msg: "All services fetched successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            })
        }
    };

}

const serviceController = new serviceClass();


module.exports = serviceController;