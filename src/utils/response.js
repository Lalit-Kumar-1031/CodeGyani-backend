


const success_response = function (statusCode, message, data) {
    return {
        code: statusCode,
        message,
        response: {
            data
        },
        status: true
    }
};


const failure_response = function (statusCode, message, data) {
    return {
        code: statusCode,
        message,
        response: {
            data
        },
        status: false
    }
};


module.exports = {
    success_response,
    failure_response
}


