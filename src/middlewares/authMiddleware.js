const jwt = require('jsonwebtoken');
const envConfig = require('../config/envConfig.js');
const catchAsync = require('../utils/catchAsync.js');
const statusCodes = require('../utils/statusCodes');
const { failure_response } = require('../utils/response');
const AppError = require('../utils/appError.js');


const verifyToken = catchAsync(async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split()[1];

        if (!token) {
            throw new AppError(statusCodes.UNAUTHORIZED, "Token Not Found");
        };

        const verify = await jwt.verify(token, envConfig.SECRET_STRING);

        if (!verify) {
            throw new Error(statusCodes > statusCodes.FORBIDDEN, "Invalid Token!")
        };

        req.user = jwt.decode(token);
        next();

    } catch (error) {
        console.log("Error While Verifying Token!");
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(
                error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
                "Failed to verify Token!",
                { message: error?.message },
                false
            )
        )
    }
});


module.exports = {
    verifyToken
}