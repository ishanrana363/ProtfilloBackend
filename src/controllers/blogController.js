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
    updateBlog = async (req, res) => {
        try {
            let id = req.params.id;
            let requestBody = req.body;
            let update = requestBody;
            let options = { new: true };
            let data = await blogModel.findByIdAndUpdate(id, update, options);
            if (!data) {
                return res.status(404).send({
                    msg: "Blog not found",
                    status: "fail",
                    data: null
                });
            }
            return res.status(200).send({
                msg: "Blog updated successfully",
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
    deleteBlog = async (req, res) => {
        try {
            let id = req.params.id;
            let data = await blogModel.findByIdAndDelete(id);
            if (!data) {
                return res.status(404).send({
                    msg: "Blog not found",
                    status: "fail",
                    data: null
                });
            }
            return res.status(200).send({
                msg: "Blog deleted successfully",
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
    allBlog = async (req,res)=>{
        try {
            let data = await blogModel.find();
            res.status(200).send({
                msg: "All blogs fetched successfully",
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

const blogController = new blogClass();

module.exports = blogController;