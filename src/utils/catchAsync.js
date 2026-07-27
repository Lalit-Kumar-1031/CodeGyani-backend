const { failure_response } = require("./response");
const statusCodes = require("./statusCodes");



const catchAsync = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        console.log("Error in the Asyn Controller", error?.message);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(
                statusCodes.INTERNAL_SERVER_ERROR,
                message,
                { message: error?.message },
            )
        )
    }
};


module.exports = catchAsync;
