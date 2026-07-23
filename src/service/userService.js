const { generateUserId } = require("../helpers/generateIds");
const { User } = require("../models");
const AppError = require("../utils/appError");
const { encrypt } = require("../utils/crypto");

class UserService {

    async createUser(data) {
        try {

            const customId = generateUserId(data?.role);

            const passwordHash = await encrypt(data?.password);

            const userPayload = {
                fullName: data?.fullName,
                email: data?.email,
                dateOfBirth: data?.dateOfBirth,
                mobileNumber: data?.mobileNumber,
                gender: data?.gender,
                role: data?.role,
                customId,
                passwordHash
            }

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
