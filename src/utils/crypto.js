const bcrypt = require('bcrypt');
const { randomBytes } = require('crypto')
const saltOrRounds = 10;

const encrypt = async (data) => {

    const hash = await bcrypt.hash(data, saltOrRounds);

    return hash;
};


const decrypt = async (data, hash) => {

    const result = await bcrypt.compare(data, hash);

    return result;
};

const generateSecretString = (bytes) => {
    const secret = randomBytes(bytes).toString('hex');
    return secret;
};


module.exports = {
    encrypt,
    decrypt
}