const axios = require('axios'); 
const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};

class SMSClass {

    async send_sms(mobile_no, sms_texts, peid = "", templateid = "") {
        const domain = process.env.SMS_API_URL
        const uid = process.env.SMS_USERNAME
        const pin = process.env.SMS_API_KEY
        const sender = process.env.SMS_SENDER
        const message = encodeURIComponent(sms_texts);

        let url = `http://${domain}/v2/sendSMS?username=${uid}&message=${message}&sendername=${sender}&smstype=TRANS&numbers=${mobile_no}&apikey=${pin}`;

        if (peid) url += `&peid=${peid}`;
        if (templateid) url += `&templateid=${templateid}`;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            return "700701";
        }
    }


    // getotp = (length = 6) => {
    //     return Math.floor(100000 + Math.random() * 900000).toString();
    // }

}

module.exports = SMSClass;