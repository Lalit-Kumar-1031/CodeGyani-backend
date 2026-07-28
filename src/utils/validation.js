
const emailRegex = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const passwordRegex = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,16}$/.test(password);


const validations = {
    emailRegex,
    passwordRegex
};


module.exports = validations;