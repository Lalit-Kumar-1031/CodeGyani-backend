const { User } = require('../models/index.js');
const services = require('../service/index.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const { decrypt } = require('../utils/crypto.js');
const signin = require('../utils/jwt.js');
const { failure_response, success_response } = require('../utils/response.js');
const statusCodes = require('../utils/statusCodes.js');
const { validateEmail, validateStrongPassword } = require('../utils/validation.js');
const zodSchemas = require('../utils/zodSchemas.js');
const zodSchemaValidator = require('../utils/zodSchemaValidator.js');


const login = catchAsync(async (req, res) => {
    try {

        const { email, password } = req.body;

        validateEmail(email);
        validateStrongPassword(password);

        const user = await User.findOne({ email }).lean();

        const isSamePassword = await decrypt(password, user?.passwordHash);

        const payload = {
            userId: user?._id,
            email: user?.email,
            mobileNumbe: user?.mobileNumber
        };

        const token = await signin(payload);

        return res.status(statusCodes.OK).json(
            success_response(
                statusCodes.OK,
                "Successfully Signed In!",
                {
                    userId: user?.customId,
                    token: signin
                },
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
            dateOfBirth,
            mobileNumber,
            gender,
            role,
            password,
        } = req.body

        const data = zodSchemaValidator(zodSchemas.userRegistrationSchema, req.body);

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


const userController = {
    createUser,
    login,
};

module.exports = userController;