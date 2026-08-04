const services = require("../service");
const catchAsync = require("../utils/catchAsync");
const { failure_response } = require("../utils/response");
const statusCodes = require("../utils/statusCodes");
const zodSchemas = require("../utils/zodSchemas");
const zodSchemaValidator = require("../utils/zodSchemaValidator");



const createCourse = catchAsync(async (req, res) => {
    try {
        const admin = req.user;

        zodSchemaValidator(zodSchemas.createCourseSchema, req.body);

        const payload = await services.courseService.createCourse({ user: admin, body: req.body });

        return res.status(statusCodes.CREATED).json(
            success_response(statusCodes.CREATED, "Successfully Created Course", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Create Course", { message: error?.message }, false)
        );
    }
});

const fetchCourses = catchAsync(async (req, res) => {
    try {
        const payload = await services.courseService.fetchCourses({ query: req.query });

        return res.status(statusCodes.OK).json(
            success_response(statusCodes.OK, "Successfully Fetched Courses", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Fetch Courses", { message: error?.message }, false)
        );
    }
});

const fetchCourse = catchAsync(async (req, res) => {
    try {
        const { customId } = req.params;

        if (!customIdValidators.validateCustomId('CR', id)) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid CustomId!")
        }

        const payload = await services.courseService.fetchCourse({ customId });

        return res.status(statusCodes.OK).json(
            success_response(statusCodes.OK, "Successfully Fetched Course", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Fetch Course", { message: error?.message }, false)
        );
    }
});

const updateCourse = catchAsync(async (req, res) => {
    try {
        const { customId } = req.params;

        if (!customIdValidators.validateCustomId('CR', id)) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid CustomId!")
        };

        zodSchemaValidator(zodSchemas.updateCourseSchema, req.body);

        const payload = await services.courseService.updateCourse({ customId, body: req.body });

        return res.status(statusCodes.OK).json(
            success_response(statusCodes.OK, "Successfully Updated Course", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Update Course", { message: error?.message }, false)
        );
    }
});

const deleteCourse = catchAsync(async (req, res) => {
    try {
        const { customId } = req.params;

        if (!customIdValidators.validateCustomId('CR', id)) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid CustomId!")
        };

        const payload = await services.courseService.deleteCourse({ customId });

        return res.status(statusCodes.OK).json(
            success_response(statusCodes.OK, "Successfully Deleted Course", payload, true)
        );
    } catch (error) {
        return res.status(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json(
            failure_response(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, "Failed to Delete Course", { message: error?.message }, false)
        );
    }
});

const courseController = {
    createCourse,
    fetchCourses,
    fetchCourse,
    updateCourse,
    deleteCourse,
};


module.exports = courseController;