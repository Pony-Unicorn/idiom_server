const crypto = require('crypto');

const config = require('../config');

/**
 * 沉睡一段时间，暂时没有取消功能
 * @param {number} duration 
 */
const sleep = duration => new Promise(resole => setTimeout(resole, duration));

/**
 * @param {*} res 
 * @param {*} status 
 * @param {*} content 
 */
const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}

const calculationPassWdHash = passWd => {
    const password_salt = config.get('password_salt');
    return crypto.createHmac('sha256', password_salt).update(passWd).digest('hex');
}

module.exports = {
    sleep,
    sendJSONresponse,
    calculationPassWdHash
}
