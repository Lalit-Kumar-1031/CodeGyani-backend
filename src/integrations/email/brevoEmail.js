const {
    BrevoClient,
    BrevoError,
    UnauthorizedError,
    TooManyRequestsError

} = require('@getbrevo/brevo');
const envConfig = require('../../config/envConfig');
const AppError = require('../../utils/appError');
const statusCodes = require('../../utils/statusCodes');


const brevo = new BrevoClient({
    apiKey: envConfig.API_KEY,
    timeoutInSeconds: 30,
});

const sendEmail = async ({ subject, html, to, toName }) => {
    try {

        const response = await brevo.transactionalEmails.sendTransacEmail({
            subject,
            sender: { email: envConfig.SENDER_EMAIL, name: envConfig.SENDER_NAME },
            to: [{ email: to, name: toName }],
            htmlContent: html
        });

        console.log("RESPONSE ", response);
        return response;

    } catch (error) {

        console.log("ERROR FROM THE EMAIL", error);
        if (error instanceof UnauthorizedError) {
            console.log(error);
            throw new AppError(statusCodes.UNAUTHORIZED, "UnAuthorized")
        }
        if (error instanceof TooManyRequestsError) {
            console.log(error);
            throw new AppError(statusCodes.TOO_MANY_REQUEST, "Too Many Request")
        }
        if (error instanceof BrevoError) {
            console.log(error);
            throw new AppError(statusCodes.INTERNAL_SERVER_ERROR, "Failed due to Brevo Error")
        };
    }
};


module.exports = sendEmail;
