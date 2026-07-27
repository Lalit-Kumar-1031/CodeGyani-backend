const jwt = require('jsonwebtoken');
const envConfig = require('../config/envConfig.js');
const catchAsync = require('../utils/catchAsync.js');
const statusCodes = require('../utils/statusCodes');
const { failure_response } = require('../utils/response');
const AppError = require('../utils/appError.js');
const { User } = require('../models/index.js');


const verifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization']

        if (!authorization) {
            throw new AppError(statusCodes.UNAUTHORIZED, "Authorization Header is Missing!")
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            throw new AppError(statusCodes.UNAUTHORIZED, "Token is Missing In the Headers!");
        }
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
};


const verifyAdmin = async (req, res, next) => {

    verifyToken(req, res, async () => {
        try {
            const {
                fullName,
                email,
                customId,
                role
            } = req.user;

            if (role !== "ADMIN") {
                throw new AppError(statusCodes.FORBIDDEN, "Access denied. Admin privileges are required.")
            }
            const isAdmin = await User.findOne({ email, customId, role }).lean();

            if (!isAdmin) {
                throw new AppError(statusCodes.UNAUTHORIZED, "UnAuthorized User!");
            };

            next()

        } catch (error) {
            console.log("Error While Verifying Admin!");
            return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
                failure_response(
                    error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
                    "Failed to verify Admin!",
                    { message: error?.message },
                    false
                )
            )
        }
    })


};


module.exports = {
    verifyToken,
    verifyAdmin
}