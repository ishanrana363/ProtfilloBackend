const { tokenCreate } = require("../helper/tokenHelper");
const userModel = require("../models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");

class userClass {
    create = async (req, res) => {
        try {
            let reqBody = req.body;
            const email = req.body.email;
            const userEmail = await userModel.findOne({ email: email });
            if (userEmail) {
                return res.status(400).send({
                    status: "fail",
                    message: "Email already exists"
                });
            }
            const data = await userModel.create(reqBody);
            res.status(201).send({
                msg: "User created successfully",
                status: "success",
                data: data
            });

        } catch (error) {
            return res.status(500).send({
                status: "fail",
                message: error.toString()
            })
        }
    };
    login = async (req, res) => {
        try {
            let reqBody = req.body;

            const { email, password } = reqBody;

            const user = await userModel.findOne({ email: email });

            if (!user) {
                return res.status(404).send({
                    status: "fail",
                    message: "User not found"
                });
            }
            let matchPassword = bcrypt.compareSync(password, user.password);
            if (!matchPassword) {
                return res.status(403).json({
                    status: "fail",
                    msg: "password not match",
                });
            }
            const key = process.env.JWTKEY;
            const token = tokenCreate({user}, key, "10d" );
            return res.status(200).json({
                status: "success",
                token: token,
                user: user
            });
        } catch (error) {
            return res.status(500).send({
                status: "fail",
                message: error.toString()
            })
        }
    };
    update = async (req, res) => {
        try {
            let id = req.headers._id;
            let filter = {_id : id} ;
            let requestBody = req.body;
            let update = requestBody;
            let data = await userModel.findByIdAndUpdate(filter, update, {new: true});
            res.status(200).send({
                msg: "User updated successfully",
                status: "success",
                data : data
            });
        } catch (error) {
            return res.status(500).send({
                status: "fail",
                message: error.toString()
            });
        }
    };
}

const userController = new userClass();

module.exports = userController;