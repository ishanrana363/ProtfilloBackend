const emailModel = require("../models/emailModel");
const sendEmail = require("../utility/sendEmailUtility");

class emailClass {
    sendEmailUser = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await emailModel.create(reqBody);
            await sendEmail(data);
            return res.status(201).send({
                status: "success",
                message: "Email sent successfully",
                data: data
            });
        } catch (error) {
            return res.status(500).send({
                status: "fail",
                message: "Failed to send email",
                error: error.message
            });
        }
    };
}

const emailController = new emailClass();

module.exports = emailController;