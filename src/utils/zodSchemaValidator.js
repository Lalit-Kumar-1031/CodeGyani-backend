const AppError = require("./appError");
const { failure_response } = require("./response");
const statusCodes = require("./statusCodes");


const zodSchemaValidator = (schema, data, res) => {



    const result = schema.safeParse(data);

    // console.log(result, "RESULT");
    if (!result.success) {
        const errors = result.error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }));
        throw new AppError(statusCodes.BAD_REQUEST, errors[0])
    };

    // console.log("RESSS ", result);
    return result.data;



};

module.exports = zodSchemaValidator;