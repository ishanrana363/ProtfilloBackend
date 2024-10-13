const blogModel = require("../models/blogModel");


class blogClass {
    async createBlog(req, res) {
        try {
            let reqBody = req.body;
            let data = await blogModel.create(reqBody);
            return res.status(201).send({
                msg: "Blog created successfully",
                status: "success",
                data: data
            });
        } catch (error) {
            res.status(500).send({
                status: "fail",
                msg: "Failed to create blog",
                error: error.message
            });
        }
    };
}

const blogController = new blogClass();

module.exports = blogController;