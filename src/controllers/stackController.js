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
