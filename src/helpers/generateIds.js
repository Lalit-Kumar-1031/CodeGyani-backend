

const generateUserId = (role) => {

    let prefix;

    if (role.toLowerCase() === "admin") {
        prefix = "ADM"
    };

    if (role.toLowerCase() === "student") {
        prefix = "STD"
    };

    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

    const date = new Date();

    const getDate = date.getDate();
    const year = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const month = getMonth.toString().length === 2 ? getMonth : `0${getMonth}`;
    const today = getDate.toString().length === 2 ? getDate : `0${getDate}`;
    let suffix = "";

    for (let i = 0; i < 12; i++) {
        suffix += str.charAt(Math.ceil(Math.random() * str.length));
    }

    return `${prefix}-${getYear}${month}${today}-${suffix}`
};

module.exports = {
    generateUserId
}