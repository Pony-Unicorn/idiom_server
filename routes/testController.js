const { sendJSONresponse } = require('../utils/Utils');

const test = async (req, res) => {
    sendJSONresponse(res, 200, { code: 1 });
}

module.exports = {
    test
}
