const axios = require('axios');

const usersModel = require('../models/users');
const { sendJSONresponse } = require('../utils/Utils');

const init = async (req, res) => {

    const id = req.query.uid;
    const shareUid = req.query.share_uid;
    const jsCode = req.query.js_code;

    if (typeof id === 'undefined') {

        if (typeof jsCode === 'undefined') {

            sendJSONresponse(res, 200, { code: -1, msg: 'jsCode未提供' });

        } else {

            const wx2sessionUrl = 'https://api.weixin.qq.com/sns/jscode2session';

            axios.get(wx2sessionUrl, {
                params: {
                    appid: 'wx4561106f648fd72e',
                    secret: 'c90ee05621cfadc16f940e2c016a1ce5',
                    js_code: jsCode,
                    grant_type: 'authorization_code'
                }
            }).then(response => response.data).then(async data => {

                data.errcode = data.errcode || 0;

                if (data.errcode === 0) {

                    const openId = data.openid;

                    let userRow = await usersModel.findByOpenIdP(openId);

                    if (userRow) {

                        await usersModel.updateByOpenIdP(openId, {
                            sessionKey: data.session_key
                        });

                        userRow = await usersModel.findByOpenIdP(openId);

                        sendJSONresponse(res, 200, {
                            code: 0,
                            data: {
                                status: userRow.status,
                                uid: userRow.id,
                                currentLevel: userRow.curLevel,
                                currentPoint: userRow.curPoint,
                                pointState: userRow.isPass === 0 ? false : true,
                                strength: userRow.strength,
                                maxStrength: userRow.maxStrength,
                                coolingTime: 100
                            }
                        });

                        return;
                    }

                    const newUser = {
                        openId: openId,
                        sessionKey: data.session_key
                    }

                    usersModel.addRecordP(newUser).then(userRow => {
                        sendJSONresponse(res, 200, {
                            code: 0,
                            data: {
                                status: userRow.status,
                                uid: userRow.id,
                                currentLevel: userRow.curLevel,
                                currentPoint: userRow.curPoint,
                                pointState: userRow.isPass === 0 ? false : true,
                                strength: userRow.strength,
                                maxStrength: userRow.maxStrength,
                                coolingTime: 100
                            }
                        });
                    });
                } else {
                    sendJSONresponse(res, 200, { code: -2, msg: `wx2session 错误代码${data.errcode}` });
                }
            }).catch(err => {
                console.log(err);
                sendJSONresponse(res, 200, { code: -3, msg: '请求微信 wx2session 错误' });
            });

        }
    } else {

        const userRow = await usersModel.findByIdP(id);

        if (userRow) {
            sendJSONresponse(res, 200, {
                code: 0,
                data: {
                    status: userRow.status,
                    uid: userRow.id,
                    currentLevel: userRow.curLevel,
                    currentPoint: userRow.curPoint,
                    pointState: userRow.isPass === 0 ? false : true,
                    strength: userRow.strength,
                    maxStrength: userRow.maxStrength,
                    coolingTime: 100
                }
            });
        } else {
            sendJSONresponse(res, 200, { code: -4, msg: '无效的 uid' });
        }
    }
}

const pointPass = async (req, res) => {

    const id = req.query.uid;
    const type = req.query.type; // 0 或 1，0 为开始，1为结束

    let userRow = await usersModel.findByIdP(id);

    if (userRow) {
        if (type == 0) {
            sendJSONresponse(res, 200, {
                code: 0,
                data: {
                    status: userRow.status,
                    uid: userRow.id,
                    currentLevel: userRow.curLevel,
                    currentPoint: userRow.curPoint,
                    pointState: userRow.isPass === 0 ? false : true,
                    strength: userRow.strength,
                    maxStrength: userRow.maxStrength,
                    coolingTime: 100
                }
            });
        } else {
            await usersModel.updatePointByIdP(id);
            userRow = await usersModel.findByIdP(id);

            sendJSONresponse(res, 200, {
                code: 0,
                data: {
                    status: userRow.status,
                    uid: userRow.id,
                    currentLevel: userRow.curLevel,
                    currentPoint: userRow.curPoint,
                    pointState: userRow.isPass === 0 ? false : true,
                    strength: userRow.strength,
                    maxStrength: userRow.maxStrength,
                    coolingTime: 100
                }
            });
        }
    } else {
        sendJSONresponse(res, 200, { code: -4, msg: '无效的 uid' });
    }
}

module.exports = {
    init,
    pointPass
}
