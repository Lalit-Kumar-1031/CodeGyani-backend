const { User } = require('../models/index.js');
const services = require('../service/index.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const { decrypt } = require('../utils/crypto.js');
const signin = require('../utils/jwt.js');
const { failure_response, success_response } = require('../utils/response.js');
const statusCodes = require('../utils/statusCodes.js');
const validations = require('../utils/validation.js');
const { validateEmail, validateStrongPassword, emailRegex } = require('../utils/validation.js');
const zodSchemas = require('../utils/zodSchemas.js');
const zodSchemaValidator = require('../utils/zodSchemaValidator.js');


const login = catchAsync(async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError(statusCodes.BAD_REQUEST, "Email and Password is required!")
        };

        zodSchemaValidator(zodSchemas.loginSchema, req.body)


        const payload = await services.userService.login({ email, password });



        return res.status(statusCodes.OK).json(
            success_response(
                statusCodes.OK,
                "Successfully Signed In!",
                payload,
                true
            )
        );

    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(
                statusCodes.INTERNAL_SERVER_ERROR,
                "Failed to Login User!",
                { message: error?.message },
                false
            )
        )
    }
});

const createUser = catchAsync(async (req, res) => {
    try {

        const {
            fullName,
            email,
            mobileNumber,
            gender,
            role,
            password,
        } = req.body

        zodSchemaValidator(zodSchemas.userRegistrationSchema, req.body);

        const payload = await services.userService.createUser(data);

        return res.status(statusCodes.CREATED).json(
            success_response(
                statusCodes.CREATED,
                "Successfully Created User",
                payload,
            )
        )
    } catch (error) {
        console.log("Error while Creating User", error?.message);
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(
                error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
                "Failed to Create User",
                { message: error?.message },
            )
        )
    }
})


const getAllUsers = catchAsync(async (req, res) => {
    try {

        const payload = await services.userService.getAllUsers();

        return res.status(statusCodes.OK).json(
            success_response(
                statusCodes.OK,
                "Successfully Fetched Users List",
                payload,
                true
            )
        )

    } catch (error) {
        console.log("Error while Fetching All Users", error?.message);
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(
                error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
                "Failed to Fetch Users List",
                { message: error?.message },
            )
        )
    }
})

const userController = {
    createUser,
    login,
    getAllUsers
};

module.exports = userController;