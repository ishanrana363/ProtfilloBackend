const stackModel = require("../models/stackModel");

exports.createStack = async (req, res) => {
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

exports.allStack = async (req, res) => {
    try {
        const { name, categories } = req.query;

        // Building a dynamic filter object based on query parameters
        let filter = {};
        if (name) {
            filter.name = { $regex: name, $options: "i" }; // case-insensitive search for name
        }
        if (categories) {
            filter.categories = { $regex: categories, $options: "i" }; // case-insensitive search for categories
        }

        let data = await stackModel.find(filter);

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

exports.getStackById = async (req, res) => {
    try {
        const stackId = req.params.id;
        const data = await stackModel.findById(stackId);

        if (!data) {
            return res.status(404).send({
                status: "fail",
                msg: "Stack not found"
            });
        }

        return res.status(200).send({
            msg: "Stack fetched successfully",
            status: "success",
            data: data
        });

    } catch (error) {
        return res.status(500).send({
            status: "fail",
            msg: "Failed to fetch stack",
            error: error.message
        });
    }
};
exports.updateStackById = async (req, res) => {
    try {
        const stackId = req.params.id;
        const reqBody = req.body;
        const data = await stackModel.findByIdAndUpdate(stackId, reqBody, { new: true });

        // If no data is found after updating, return a 404 error
        if (!data) {
            return res.status(404).send({
                status: "fail",
                msg: "Stack not found"
            });
        }

        // If the update is successful, return a success response with the updated data
        return res.status(200).send({
            msg: "Stack updated successfully",
            status: "success",
            data: data
        });

    } catch (error) {
        // If an error occurs, return a 500 error with the error message
        return res.status(500).send({
            status: "fail",
            msg: "Failed to update stack",
            error: error.message
        });
    }
};

exports.deleteStackById = async (req, res) => {
    try {
        const stackId = req.params.id;
        const data = await stackModel.findByIdAndDelete(stackId);

        // If no data is found after deleting, return a 404 error
        if (!data) {
            return res.status(404).send({
                status: "fail",
                msg: "Stack not found"
            });
        }

        // If the deletion is successful, return a success response with a message
        return res.status(200).send({
            msg: "Stack deleted successfully",
            status: "success"
        });

    } catch (error) {
        // If an error occurs, return a 500 error with the error message
        return res.status(500).send({
            status: "fail",
            msg: "Failed to delete stack",
            error: error.message
        });
    }
};
