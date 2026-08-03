
const generateOTP = () => {
    return Math.ceil(Math.random() * 999999);
}


const generateReferenceId = () => {

    const str = "ABCDEFGHIJKLMNOPQRST0123456789";

    const prefix = "RF-";

    let suffix = "";

    for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * str.length);
        suffix += str.charAt(index);
    };

    return prefix + suffix;

};


module.exports = {
    generateOTP,
    generateReferenceId
}