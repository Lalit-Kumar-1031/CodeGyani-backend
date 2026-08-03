const { generateUserId } = require("../helpers/generateIds.js");
const sendEmail = require("../integrations/email/brevoEmail.js");
const { User } = require("../models");
const AppError = require("../utils/appError.js");
const { encrypt, compare } = require("../utils/crypto.js");
const welcomeEmail = require("../integrations/emailTemplates/welcomeTemplate.js");
const statusCodes = require("../utils/statusCodes.js");
const signin = require("../utils/jwt.js");

class UserService {

    async createUser(data) {
        try {

            const customId = generateUserId(data?.role);

            const passwordHash = await encrypt(data?.password);

            const userPayload = {
                fullName: data?.fullName,
                email: data?.email,
                mobileNumber: data?.mobileNumber,
                gender: data?.gender,
                role: data?.role,
                customId,
                passwordHash
            }

            const user = await User.findOne({
                $or: [
                    { email: data?.email },
                    { mobileNumber: data?.mobileNumber }
                ]
            });


            if (user) {
                throw new AppError(statusCodes.CONFLICT, "email or mobileNumber Already Exist!");
            };

            const newUser = await User.create(userPayload);

            if (newUser) {
                const subject = 'Account Created Successfully!';
                const html = welcomeEmail({ name: data?.fullName, date: new Date(), url: 'https://wrvvhg5v-5173.inc1.devtunnels.ms/' });
                try {
                    await sendEmail({ subject, html, to: data?.email, toName: data?.fullName });
                } catch (error) {
                    await User.deleteOne({ _id: newUser?._id });
                }
            }

            return {
                customId: newUser?.customId,
                userName: newUser?.fullName
            }

        } catch (error) {
            console.log("Error While Creating User in Service", error?.message);
            throw new AppError(error?.statusCode, error?.message)
        }
    };

    async login({ email, password }) {

        try {

            const user = await User.findOne({ email }).select("passwordHash fullName customId email role").lean();

            if (!user) {
                throw new AppError(statusCodes.BAD_REQUEST, "User Not Found!");
            };

            const passwordMatch = await compare(password, user?.passwordHash);

            if (!passwordMatch) {
                throw new AppError(statusCodes.CONFLICT, "Incorrect Password!")
            };

            const payload = {
                fullName: user?.fullName,
                customId: user?.customId,
                email: user?.email,
                role: user?.role
            };

            const token = await signin(payload);

            return {
                userName: user?.fullName,
                token
            }


        } catch (error) {
            console.log("Error in User Login Service", error);
            throw new AppError(error?.statusCode, error?.message)
        }
    }

    async getAllUsers() {
        try {

            const users = await User.find({
                role: {
                    $ne: 'ADMIN'
                }
            });

            return users;
        } catch (error) {
            console.log("Error in Get all user Service", error);
            throw new AppError(error?.statusCode, error)
        }
    }
};


module.exports = UserService;
