const jwt = require('jsonwebtoken');
const { calculationPassWdHash } = require('../utils/encryption');

const usersModel = require('../models/users');
const config = require('../config');
const { sendJSONresponse } = require('../utils/Utils');

const login = async (req, res) => {

    const account = req.body.account;
    const password = req.body.password;

    const user = await usersModel.getPasswordByAccount(account);
    const passwordHash = calculationPassWdHash(password);

    if (user && user.password && user.password == passwordHash) {
        const tokenObj = {
            account
        };

        const jwt_secret = config.get('jwt_secret');
        const token = jwt.sign(tokenObj, jwt_secret, {
            expiresIn: '365d' // 授权时效 365d 天
        });

        sendJSONresponse(res, 200, {
            code: 0,
            data: {
                token
            }
        });

    } else {
        sendJSONresponse(res, 200, { code: -2 });
    }
}

module.exports = {
    login
};
