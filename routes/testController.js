const usersModel = require('../models/users');

const { sendJSONresponse } = require('../utils/Utils');

const test = (req, res) => {
    const account = req.query.account;
    usersModel.getPasswordByAccount(account).then(u => {
        sendJSONresponse(res, 200, u);
    }).catch(() => {
        sendJSONresponse(res, 404, "account can not be retrieved");
    })
}

module.exports = {
    test
}
