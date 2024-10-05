const userModel = require("../models/userModel");

class userClass {
    create = async (req,res)=>{
        try {
            let reqBody = req.body;
            const email = req.body.email;
            const userEmail = await userModel.findOne({email: email});
            if(userEmail){
                return res.status(400).send({
                    status: "fail",
                    message: "Email already exists"
                });
            }
            const data = await userModel.create(reqBody);
            res.status(201).send({
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
}

const userController = new userClass();

module.exports = userController;