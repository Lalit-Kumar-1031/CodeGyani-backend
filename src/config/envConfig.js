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



const envConfig = {
    PORT,
    MONGOOSE_URL
};

module.exports = envConfig;
