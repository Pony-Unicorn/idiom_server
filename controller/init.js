const axios = require('axios');
const dayjs = require('dayjs');

const { sendJSONresponse } = require('../utils/Utils');
const usersModel = require('../models/users');
const wxAuthConf = require('../constant/wxAuth');
const appErrorCode = require('../constant/appErrorCode');

const init = async (req, res) => {

    const id = req.query.uid;
    const shareUid = req.query.share_uid;
    const jsCode = req.query.js_code;

    const resBody = { code: 0, data: {} }; // 响应数据

    let userRow;

    if (typeof id === 'undefined') {

        if (typeof jsCode === 'undefined') {
            resBody.code = -1;
        } else {
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

                if (wxAuthData.errcode === 0) {

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
                } else {
                    resBody.code = -2;
                }

            } catch (err) {
                userRow = null;
                resBody.code = -3;
            }
        }
    } else {
        userRow = await usersModel.findByIdP(id);
    }

    if (userRow) {
        resBody.code = 0;
        resBody.data = {
            status: userRow.status,
            uid: userRow.id,
            currentLevel: userRow.curLevel,
            currentPoint: userRow.curPoint,
            pointState: userRow.isPass === 0 ? false : true,
            strength: userRow.strength,
            maxStrength: userRow.maxStrength,
            coolingTime: 100
        };
    } else {
        resBody.code = appErrorCode.userUniqueIdentity;
    }

    sendJSONresponse(res, 200, resBody);
}

module.exports = init;
