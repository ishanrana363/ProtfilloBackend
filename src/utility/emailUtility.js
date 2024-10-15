
const nodemailer = require('nodemailer');
const emailKey = process.env.EMAILKEY
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ishanrana094@gmail.com',
        pass: emailKey
    }
});

async function sendNotificationEmail(projectData) {
    try {
        let info = await transporter.sendMail({
            from: '"Project Notifications" ishanrana094@gmail.com ', 
            to: 'ishanrana094@gmail.com', 
            subject: `New Project Created: ${projectData.name}`,
            text: `A new project has been created.\n\n
                   Name: ${projectData.name}\n
                   Email: ${projectData.email}\n
                   Subject: ${projectData.subject}\n
                   Description: ${projectData.description}\n
                   Project Link: ${projectData.project_link}\n
}`
        });


    } catch (error) {
        return error.message;
    }
}

module.exports = sendNotificationEmail;