
const nodemailer = require('nodemailer');
const emailKey = process.env.EMAILKEY
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ishanrana094@gmail.com',
        pass: emailKey
    }
});

async function sendEmail(projectData) {
    try {
        let info = await transporter.sendMail({
            from: '"Contact Notifications" ishanrana094@gmail.com ',
            to: 'ishanrana094@gmail.com',
            subject: `${projectData.name} send your mail `,
            text: `${projectData.name} contact you for your job interview .\n\n
                   Email: ${projectData.email}\n
                   Name: ${projectData.name}\n
                   Phone: ${projectData.phone}\n
                   Message: ${projectData.msg}\n
`
        });


    } catch (error) {
        return error.message;
    }
}

module.exports = sendEmail;