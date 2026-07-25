const dotenv = require('dotenv');
const path = require('path');

let environment = "";
environment = "development";


if (environment === "development") {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.development') })
} else {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.production') })
};



const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const SECRET_STRING = process.env.SECRET_STRING;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_KEY = process.env.SMTP_KEY;
const SENDER_NAME = process.env.SENDER_NAME;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const API_KEY = process.env.API_KEY;


const envConfig = {
    PORT,
    MONGOOSE_URL,
    SECRET_STRING,

    //EMAIL -BREVO 
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_KEY,
    SENDER_EMAIL,
    SENDER_NAME,
    API_KEY
};

module.exports = envConfig;
