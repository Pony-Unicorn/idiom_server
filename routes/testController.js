const { sendJSONresponse } = require('../utils/Utils');

const test = async (req, res) => {
    sendJSONresponse(res, 200, { code: 0, msg: '请求成功' });
}

module.exports = {
    test
}
