const { query: checkQuery, validationResult } = require('express-validator');
const dayjs = require('dayjs');

const usersModel = require('../models/users');

const { sendJSONresponse } = require('../utils/Utils');
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
        if (type === '0') {

            const strength = userRow.strength;
            let newStrength = strength;

            const curPoint = userRow.curPoint;
            let newCurPoint = curPoint;

            const isPass = userRow.isPass;
            let newIsPass = isPass;

            if (strength < 1) {
                sendJSONresponse(res, 200, { code: appErrorCode.strengthLack });
                return;
            }

            if (isPass === 1) {

                newStrength = strength - 1;
                newCurPoint = curPoint + 1;
                newIsPass = 0;

                await usersModel.updateByIdP(id, {
                    strength: newStrength, // 后期考虑使用原子更新
                    curPoint: newCurPoint,
                    isPass: newIsPass
                });
            }

            sendJSONresponse(res, 200, {
                code: 0,
                data: {
                    currentLevel: userRow.curLevel,
                    currentPoint: newCurPoint,
                    pointState: newIsPass === 0 ? false : true,
                    strength: newStrength,
                    maxStrength: userRow.maxStrength,
                    coolingTime: 0
                }
            });
        } else {

            await usersModel.updateByIdP(id, { isPass: 1 }); // 更新关卡已完成，后续加入防作弊验证

            sendJSONresponse(res, 200, {
                code: 0,
                data: {
                    currentLevel: userRow.curLevel,
                    currentPoint: userRow.curPoint,
                    pointState: true,
                    strength: userRow.strength,
                    maxStrength: userRow.maxStrength,
                    coolingTime: 0
                }
            });
        }
    } else {
        sendJSONresponse(res, 200, { code: -4 });
    }
}

module.exports = pointPass;
