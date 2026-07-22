class AppError extends Error {

    constructor(errorcode, message, statusCode) {
        super(message);

        this.message = message;
        this.errorcode = errorcode;
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
};

module.exports = AppError;