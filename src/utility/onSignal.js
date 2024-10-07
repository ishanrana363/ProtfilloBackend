const axios = require('axios');

require("dotenv").config();
let id = process.env.APPID
const apiKey = process.env.APIKEY

async function sendOneSignalNotification(projectData) {
    const notificationData = {
        app_id: id,
        headings: { "en": "New Project Created" },
        contents: { 
            "en": `A new project has been created: ${projectData.name}` 
        }, 
        included_segments: ["All"], 
        data: {
            project_id: projectData._id,
            project_name: projectData.name
        }
    };

    try {
        const response = await axios.post('https://onesignal.com/api/v1/notifications', notificationData, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': apiKey // আপনার OneSignal REST API Key
            }
        });
        console.log('OneSignal notification sent:', response.data);
    } catch (error) {
        console.log('Error sending OneSignal notification:', error.response ? error.response.data : error.message);
    }
}
module.exports = sendOneSignalNotification