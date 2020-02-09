const { query: checkQuery, validationResult } = require('express-validator');
const dayjs = require('dayjs');

const { sendJSONresponse } = require('../utils/Utils');
const usersModel = require('../models/users');
const appErrorCode = require('../constant/appErrorCode');

const pointPass = async (req, res) => {

    await checkQuery('uid', 'uid 参数不合法').isString().isLength({ min: 5, max: 10 }).run(req);
    await checkQuery('type', 'type 参数不合法').custom(value => ['0', '1'].some(v => v === value)).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        sendJSONresponse(res, 200, { code: appErrorCode.paramInvalid });
        return;
    }

    const id = req.query.uid;
    const type = req.query.type; // 0 或 1，0 为开始，1为结束

    let userRow = await usersModel.findByIdP(id);

    if (userRow) {
        if (type == 0) {

            let strength = userRow.strength - 1;

            if (strength < 0) {
                strength = 0;
                sendJSONresponse(res, 200, { code: -1 });
                return;
            }

            await usersModel.updateByIdP(id, {
                strength,
                lastTimeStrength: new Date()
            });

            const date1 = dayjs(userRow.lastTimeStrength);
            const date2 = dayjs();
            const dateDiff = date2.diff(date1);

            sendJSONresponse(res, 200, {
                code: 0,
                data: {
                    status: userRow.status,
                    uid: userRow.id,
                    currentLevel: userRow.curLevel,
                    currentPoint: userRow.curPoint,
                    pointState: userRow.isPass === 0 ? false : true,
                    strength,
                    maxStrength: userRow.maxStrength,
                    coolingTime: dateDiff
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

module.exports = pointPass;
