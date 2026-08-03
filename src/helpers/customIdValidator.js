

const PREFIXES = ["TR", "CR", "BC", "RT", "PT"]

const validateCustomId = (prefix, id) => {

    if (!PREFIXES.includes(prefix)) { return false };

    const date = id.split("-")[1];

    if (id.length !== 22) { return false };


    if (typeof dateStr !== 'string' || !/^\d{8}$/.test(dateStr)) {
        return false;
    }

    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10);
    const day = parseInt(dateStr.substring(6, 8), 10);

    // 2. Basic range checks
    if (month < 1 || month > 12) { return false };
    if (day < 1 || day > 31) { return false };
    if (year < 1000 || year > 9999) { return false };


    const date = new Date(year, month - 1, day);

    if (!date) {
        return false;
    };

    return true;

}


const customIdValidators = {
    validateCustomId
}