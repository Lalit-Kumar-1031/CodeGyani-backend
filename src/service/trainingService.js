const { generateCustomId } = require("../helpers/generateIds");
const { Training } = require("../models");
const statusCodes = require("../utils/statusCodes");

class TrainingService {

    async createTraining({ user, body }) {
        try {

            const customId = generateCustomId('training');

            const data = {
                customId,
                title: body?.title,
                description: body?.description,
                duration: body?.duration,
                fee: body?.fee,
                onBoardedBy: user?.name,
                onBoardedByUserId: user?.customId
            };

            const training = await Training.create(data);

            return {
                customId,
                title: body?.title
            }

        } catch (error) {
            console.log("Error While Creating Training Service", error);
            throw new AppError(error?.statusCodes || statusCodes.INTERNAL_SERVER_ERROR, error?.message)
        }
    }

    async fetchTrainings() {
        try {
            const { page = 1, limit = 10, isActive } = query || {};

            const filter = {};
            if (isActive !== undefined) {
                filter.isActive = isActive === 'true' || isActive === true;
            }

            const skip = (Number(page) - 1) * Number(limit);

            const [trainings, total] = await Promise.all([
                Training.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(Number(limit)),
                Training.countDocuments(filter),
            ]);

            return {
                trainings,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit)),
                },
            };

        } catch (error) {
            console.log("Error While Fetching Trainings Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };

    async fetchTraining({ customId }) {
        try {
            const training = await Training.findOne({ customId });

            if (!training) {
                throw new AppError(statusCodes.NOT_FOUND, "Training not found");
            }

            return training;

        } catch (error) {
            console.log("Error While Fetching Training Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };

    async updateTraining({ customId, body }) {
        try {
            const training = await Training.findOne({ customId });

            if (!training) {
                throw new AppError(statusCodes.NOT_FOUND, "Training not found");
            }

            const updatableFields = ['title', 'description', 'duration', 'fee', 'isActive'];

            updatableFields.forEach((field) => {
                if (body?.[field] !== undefined) {
                    training[field] = body[field];
                }
            });

            await training.save();

            return {
                customId: training?.customId,
                title: training?.title,
            };

        } catch (error) {
            console.log("Error While Updating Training Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };

    async deleteTraining({ customId }) {
        try {
            const training = await Training.findOne({ customId });

            if (!training) {
                throw new AppError(statusCodes.NOT_FOUND, "Training not found");
            }

            await Training.deleteOne({ customId });

            return {
                customId: training?.customId,
            };

        } catch (error) {
            console.log("Error While Deleting Training Service", error);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message);
        }
    };
};

module.exports = TrainingService