const { generateCustomId } = require("../helpers/generateIds");
const AppError = require("../utils/appError");
const statusCodes = require("../utils/statusCodes");




class CourseService {

    async createCourse({ user, body }) {
        try {

            const training = await Training.findById(body?.trainingId);
            if (!training) {
                throw new AppError(statusCodes.NOT_FOUND, "Referenced training not found");
            }

            const customId = generateCustomId('course');

            const data = {
                customId,
                trainingId: body?.trainingId,
                title: body?.title,
                description: body?.description,
                category: body?.category,
                mode: body?.mode,
                curriculum: body?.curriculum,
                isActive: body?.isActive,
            };

            const course = await Course.create(data);

            return {
                customId: course?.customId,
                title: course?.title,
            };

        } catch (error) {
            console.log("Error While Creating Course Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };

    async fetchCourses({ query }) {
        try {
            const { page = 1, limit = 10, trainingId, mode, isActive } = query || {};

            const filter = {};
            if (trainingId) filter.trainingId = trainingId;
            if (mode) filter.mode = mode;
            if (isActive !== undefined) {
                filter.isActive = isActive === 'true' || isActive === true;
            }

            const skip = (Number(page) - 1) * Number(limit);

            const [courses, total] = await Promise.all([
                Course.find(filter)
                    .populate('trainingId', 'customId title')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(Number(limit)),
                Course.countDocuments(filter),
            ]);

            return {
                courses,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit)),
                },
            };

        } catch (error) {
            console.log("Error While Fetching Courses Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };

    async fetchCourse({ customId }) {
        try {
            const course = await Course.findOne({ customId }).populate('trainingId', 'customId title');

            if (!course) {
                throw new AppError(statusCodes.NOT_FOUND, "Course not found");
            }

            return course;

        } catch (error) {
            console.log("Error While Fetching Course Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };

    async updateCourse({ customId, body }) {
        try {
            const course = await Course.findOne({ customId });

            if (!course) {
                throw new AppError(statusCodes.NOT_FOUND, "Course not found");
            }

            // If trainingId is being changed, validate the new reference exists
            if (body?.trainingId) {
                const training = await Training.findById(body.trainingId);
                if (!training) {
                    throw new AppError(statusCodes.NOT_FOUND, "Referenced training not found");
                }
            }

            const updatableFields = [
                'trainingId', 'title', 'description', 'category',
                'mode', 'curriculum', 'isActive',
            ];

            updatableFields.forEach((field) => {
                if (body?.[field] !== undefined) {
                    course[field] = body[field];
                }
            });

            await course.save();

            return {
                customId: course?.customId,
                title: course?.title,
            };

        } catch (error) {
            console.log("Error While Updating Course Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };

    async deleteCourse({ customId }) {
        try {
            const course = await Course.findOne({ customId });

            if (!course) {
                throw new AppError(statusCodes.NOT_FOUND, "Course not found");
            }

            await Course.deleteOne({ customId });

            return {
                customId: course?.customId,
            };

        } catch (error) {
            console.log("Error While Deleting Course Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };

};


module.exports = CourseService;