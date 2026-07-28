const Otp = require('../models/index.js');
const services = require('../service/index.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const { success_response, failure_response } = require('../utils/response.js');
const statusCodes = require('../utils/statusCodes.js');
const validations = require('../utils/validation.js');




const sentOTP = catchAsync(async (req, res) => {
    try {

        const { email } = req.params;

        console.log(email);

        if (email && !validations.emailRegex(email)) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid Email Format!");
        };

        const payload = await services.authService.sentOtp({ email });

        return res.status(statusCodes.OK).json(
            success_response(
                statusCodes.OK,
                "Successfully Sent OTP",
                payload,
                true
            )
        )

    } catch (error) {
        console.log("Error While Sending OTP", error?.message);
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(
                error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
                "Failed to Send OTP!",
                { message: error?.message },
                false
            )
        )
    }
});


const verifyOTP = catchAsync(async (req, res) => {
    try {
        const { email } = req.params;
        const { referenceId, otp } = req.body;



        if (email && !validations.emailRegex(email)) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid Email Format!");
        };

        if (!referenceId || !otp) {
            throw new AppError(statusCodes.BAD_REQUEST, "ReferenceId and OTP is Required!")
        };

        const payload = await services.authService.verifyOtp({ referenceId, email, otp });


        return res.status(statusCodes.OK).json(
            success_response(
                statusCodes.OK,
                "Successfully Verified OTP",
                payload,
                true
            )
        );
    } catch (error) {
        console.error('Verify OTP error:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while verifying OTP',
        });
    }
});


const authController = {
    sentOTP
};

module.exports = authController;