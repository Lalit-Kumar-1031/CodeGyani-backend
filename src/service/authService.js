const { FiveMinutesFromNow } = require('../helpers/dateHandler.js');
const sendEmail = require('../integrations/email/brevoEmail.js');
const otpTemplate = require('../integrations/emailTemplates/otpTemplate.js');
const { User, Otp } = require('../models/index.js');
const AppError = require('../utils/appError.js');
const { encrypt, compare } = require('../utils/crypto.js');
const { generateOTP, generateReferenceId } = require('../utils/otpUtils.js');
const statusCodes = require("../utils/statusCodes");


class AuthService {

    async sentOtp({ email }) {
        try {

            const user = await User.findOne({ email }).select("_id").lean();

            if (user) {
                throw new AppError(statusCodes.BAD_REQUEST, "Email Already Exist!");
            };

            const otpNumber = generateOTP();

            const otpHash = await encrypt(otpNumber.toString());

            const otpPayload = {
                verificationType: "email",
                verificationValue: email,
                referenceId: generateReferenceId(),
                otpHash,
                expiresIn: new Date(FiveMinutesFromNow()),
            };

            console.log(otpPayload);

            const otp = await Otp.create(otpPayload);

            if (otp) {
                try {
                    const subject = "OTP For Email Verification";
                    const name = email.split("@")[0];
                    const html = otpTemplate({ name, otp: otpNumber, expiryMinutes: 5, date: new Date() });
                    await sendEmail({ subject, html, to: email, toName: name });

                } catch (error) {
                    console.log("Error while Sending Otp", error);
                }
            };

            return {
                email,
                referenceId: otpPayload.referenceId
            }

        } catch (error) {
            console.log("Error in Sent OTP Service", error?.message);
            throw new AppError(error?.statusCode || statusCodes.INTERNAL_SERVER_ERROR, error?.message)
        }
    }


    async verifyOtp({ referenceId, email, otp }) {
        // 1. Fetch the stored OTP record
        const record = await Otp.findOne({
            referenceId,
            verificationValue: email,
            verificationType: 'email',
        });

        if (!record) {
            throw new AppError(statusCodes.NOT_FOUND, "OTP Record Not Found!")
        }

        // 2. Check expiry
        const now = new Date();
        if (new Date(record.expiresIn) < now) {
            await Otp.deleteOne({ referenceId });
            throw new AppError(statusCodes.BAD_REQUEST, "OTP Expired!")
        }

        // 3. Compare plain OTP with stored hash
        const isMatch = await compare(otp, record.otpHash);
        if (!isMatch) {
            throw new AppError(statusCodes.BAD_REQUEST, "Invalid OTP")
        }

        // 4. Success — invalidate OTP so it can't be reused
        await OtpStore.deleteOne({ referenceId });

        return {
            email,
            referenceId
        }
    }
};

module.exports = AuthService;