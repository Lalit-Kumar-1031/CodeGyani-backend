
const { createTrainingSchema } = require('../validations/training.validation');
const trainingService = require('../services/training.service');
const catchAsync = require('../utils/catchAsync');
const statusCodes = require('../utils/statusCodes');
const { failure_response, success_response } = require('../utils/response');
const zodSchemaValidator = require('../utils/zodSchemaValidator');
const zodSchemas = require('../utils/zodSchemas');
const services = require('../service');


const createTraining = catchAsync(async (req, res) => {
    try {
        const admin = req.user;

        zodSchemaValidator(zodSchemas.createTrainingSchema, req.body);

        const payload = await services.trainingService.createTraining({ user: admin, body: req.body });

        return res.status(statusCodes.CREATED).json(
            success_response(
                statusCodes.CREATED,
                "Successfully Created Training",
                payload,
                true
            )
        )
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(
                error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
                "Failed to Create Training",
                { message: error?.message },
                false
            )
        )
    }
});

const fetchTrainings = catchAsync(async (req, res) => {
    try {
        const payload = await services.trainingService.fetchTrainings();

        return res.status(statusCodes.OK).json(
            success_response(statusCodes.OK, "Successfully Fetched Trainings", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Fetch Trainings", { message: error?.message }, false)
        );
    }
});

const fetchTraining = catchAsync(async (req, res) => {
    try {
        const { customId } = req.params;

        if (!customIdValidators.validateCustomId('TR', id)) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid CustomId!")
        }

        const payload = await services.trainingService.fetchTraining({ customId });

        return res.status(statusCodes.OK).json(
            success_response(statusCodes.OK, "Successfully Fetched Training", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Fetch Training", { message: error?.message }, false)
        );
    }
});

const updateTraining = catchAsync(async (req, res) => {
    try {
        const { customId } = req.params;

        if (!customIdValidators.validateCustomId('TR', id)) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid CustomId!")
        };


        zodSchemaValidator(zodSchemas.updateTrainingSchema, req.body);

        const payload = await services.trainingService.updateTraining({ customId, body: req.body });

        return res.status(statusCodes.OK).json(
            success_response(statusCodes.OK, "Successfully Updated Training", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Update Training", { message: error?.message }, false)
        );
    }
});

const deleteTraining = catchAsync(async (req, res) => {
    try {
        const { customId } = req.params;

        if (!customIdValidators.validateCustomId('TR', id)) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid CustomId!")
        };

        const payload = await services.trainingService.deleteTraining({ customId });

        return res.status(statusCodes.OK).json(
            success_response(statusCodes.OK, "Successfully Deleted Training", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Delete Training", { message: error?.message }, false)
        );
    }
});


const trainingContoller = {
    creatreTraining,
    fetchTrainings,
    fetchTraining,
    updateTraining,
    deleteTraining
};

module.exports = trainingContoller;