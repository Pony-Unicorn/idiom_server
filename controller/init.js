const axios = require('axios');

const { sendJSONresponse } = require('../utils/Utils');
const usersModel = require('../models/users');
const coolingTimeStrength = require('../services/coolingTimeStrength');

const wxAuthConf = require('../constant/wxAuth');
const appErrorCode = require('../constant/appErrorCode');

/** 游戏登录和初始化*/
const init = async (req, res) => {

    const id = req.query.uid;
    const shareUid = req.query.share_uid;
    const jsCode = req.query.js_code;

    let userRow = null;

    if (typeof id === 'undefined') {

        if (typeof jsCode === 'undefined') {
            sendJSONresponse(res, 200, { code: appErrorCode.paramInvalid });
            return;
        }

        const wx2sessionUrl = wxAuthConf.wx2sessionUrl;

        try {
            const wxAuthRawData = await axios.get(wx2sessionUrl, {
                params: {
                    appid: wxAuthConf.appid,
                    secret: wxAuthConf.secret,
                    js_code: jsCode,
                    grant_type: 'authorization_code'
                }
            });

            const wxAuthData = wxAuthRawData.data;

            wxAuthData.errcode = wxAuthData.errcode || 0;

            if (wxAuthData.errcode !== 0) {
                sendJSONresponse(res, 200, { code: -1 });
                return;
            }

            const openId = wxAuthData.openid;

            userRow = await usersModel.findByOpenIdP(openId);

            // 后期优化 SQL 语句
            if (userRow) {
                await usersModel.updateByOpenIdP(openId, {
                    sessionKey: wxAuthData.session_key
                });

                userRow = await usersModel.findByOpenIdP(openId);
            } else {
                userRow = await usersModel.addRecordP({
                    openId,
                    sessionKey: wxAuthData.session_key
                });
            }

        } catch (err) {
            sendJSONresponse(res, 200, { code: -3 });
            return;
        }
    } else {
        userRow = await usersModel.findByIdP(id);
    }

    if (!userRow) {
        sendJSONresponse(res, 200, { code: appErrorCode.userUniqueIdentity });
        return;
    }

    const { strength, maxStrength, coolingTime } = await coolingTimeStrength(id, userRow.strength, userRow.lastTimeStrength);

    sendJSONresponse(res, 200, {
        code: 0,
        data: {
            uid: userRow.id,
            currentLevel: userRow.curLevel,
            currentPoint: userRow.curPoint,
            pointState: userRow.isPass,
            strength,
            maxStrength,
            coolingTime
        }
    });
}

module.exports = init;
