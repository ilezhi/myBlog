const bcrypt = require('bcrypt');
const config = require('../config');

const encrypt = async pass => {
    let salt = await bcrypt.genSalt(config.saltTimes);
    let hash = await bcrypt.hash(pass, salt);

    return hash;
};


const validate = async (pass, hash) => {
    let isOk = await bcrypt.compare(pass, hash);
    return isOk;
};


module.exports = {
    encrypt,
    validate,
};