const { sendJSONresponse } = require('../utils/Utils');

const physicalRecovery = async (req, res) => {
    sendJSONresponse(res, 200, { code: 0, data: {} });
}

module.exports = physicalRecovery;
