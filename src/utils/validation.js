function validateEmail(email) {
    if (!email || typeof email !== "string") {
        throw new Error("Email is required and must be a string");
    }

    const trimmedEmail = email.trim();

    // RFC 5322 - practical/simplified version, covers standard cases well
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (!emailRegex.test(trimmedEmail)) {
        throw new Error("Please enter a valid email address");
    }

    if (trimmedEmail.length > 254) {
        throw new Error("Email address is too long");
    }

    return true;
}

function validateStrongPassword(password) {
    
    if (!password || typeof password !== "string") {
        throw new Error("Password is required and must be a string");
    }

    const rules = [
        {
            regex: /.{8,}/,
            message: "Password must be at least 8 characters long",
        },
        {
            regex: /[A-Z]/,
            message: "Password must contain at least one uppercase letter",
        },
        {
            regex: /[a-z]/,
            message: "Password must contain at least one lowercase letter",
        },
        {
            regex: /\d/,
            message: "Password must contain at least one number",
        },
        {
            regex: /[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/~`]/,
            message: "Password must contain at least one special character",
        },
    ];

    for (const rule of rules) {
        if (!rule.regex.test(password)) {
            throw new Error(rule.message);
        }
    }

    return true;
}

module.exports = validateStrongPassword;

module.exports = {
    validateEmail,
    validateStrongPassword,
};