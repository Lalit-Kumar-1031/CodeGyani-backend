const { generateUserId } = require("../helpers/generateIds");
const { User } = require("../models");
const AppError = require("../utils/appError");

class UserService {

    async createUser(data) {
        try {

            const customId = generateUserId(data?.role);

            const userPayload = { ...data, customId };

            const user = await User.create(userPayload);

            return {
                customId: user?.customId,
                userName: user?.fullName
            }

        } catch (error) {
            console.log("Error While Creating User in Service", error?.message);
            throw new AppError(error?.statusCode, error?.message)
        }
    }
};


module.exports = UserService;
