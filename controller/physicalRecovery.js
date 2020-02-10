const { query: checkQuery, validationResult } = require('express-validator');

const usersModel = require('../models/users');
const coolingTimeStrength = require('../services/coolingTimeStrength');

const { sendJSONresponse } = require('../utils/Utils');
const appErrorCode = require('../constant/appErrorCode');

const physicalRecovery = async (req, res) => {

    await checkQuery('uid', 'uid 参数不合法').isString().isLength({ min: 5, max: 10 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        sendJSONresponse(res, 200, { code: appErrorCode.paramInvalid });
        return;
    }

    const id = req.query.uid;

    const userRow = await usersModel.findByIdP(id);

    if (userRow) {

        const { strength, maxStrength, coolingTime } = await coolingTimeStrength(id, userRow.strength, userRow.lastTimeStrength);

        sendJSONresponse(res, 200, {
            code: 0,
            data: {
                strength,
                coolingTime
            }
        });
    } else {
        sendJSONresponse(res, 200, { code: appErrorCode.userUniqueIdentity });
    }
}

module.exports = physicalRecovery;
