const AppError = require("./appError");
const { failure_response } = require("./response");
const statusCodes = require("./statusCodes");


const zodSchemaValidator = async (schema, data, res) => {

    try {

        const res = schema.safeParse(data);

        if (!res.success) {
            const errors = result.error.errors.map((e) => ({
                field: e.path[0],
                message: e.message,
            }));
            throw new AppError(statusCodes.BAD_REQUEST, errors)
        };

        return res.data;
    } catch (error) {
        console.log("Failed to Validate Schema", error?.message);
        return res.status(statusCodes.BAD_REQUEST).json(
            failure_response(
                statusCodes.BAD_REQUEST,
                "Failed to Validate Schema",
                { message: error?.message },
                false
            )
        )
    }

};

module.exports = zodSchemaValidator;