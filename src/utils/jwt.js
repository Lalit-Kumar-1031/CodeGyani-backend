const jwt = require('jsonwebtoken');
const statusCodes = require('./statusCodes');
const { failure_response } = require('./response');
const envConfig = require('../config/envConfig');


const signin = async (payload) => {
    try {

        const signin = await jwt.sign(payload, envConfig.SECRET_STRING, { "expiresIn": "1h" });

        return signin;

    } catch (error) {
        console.log("Error While Signing in JWT", error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(
                statusCodes.INTERNAL_SERVER_ERROR,
                "Failed to Signin JWT!",
                { message: error?.message },
                false
            )
        )
    }
}


module.exports = signin