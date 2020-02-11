const dayjs = require('dayjs');

const { severIntegersAndDecimals } = require('../utils/Utils');
const usersModel = require('../models/users');

const gameConf = require('../gameConf');

/**
 * 
 * @param {number} id 
 * @param {number} oldStrength 
 * @param {Date} oldLastTimeStrength 
 */
const coolingTimeStrength = async (id, oldStrength, oldLastTimeStrength) => {

    const bases = gameConf.get('bases');
    const maxStrength = bases.maxStrength;

    let strength = oldStrength;
    let coolingTime = 0; // 单位 秒

    if (oldStrength < maxStrength) {

        let lastTimeStrength = new Date();

        const lastTime = dayjs(oldLastTimeStrength);
        const curTime = dayjs(lastTimeStrength);
        const diffTime = curTime.diff(lastTime, 'second');

        /**@type number */
        const recoveryStrengthTime = bases.recoveryStrengthTime;

        const recoverable = Math.floor(diffTime / recoveryStrengthTime * 100) / 100; // 可以恢复的体力值，保留两位小数
        const actualStrength = maxStrength - oldStrength; // 实际应该恢复的体力值

        const diffStrength = recoverable - actualStrength;

        if (diffStrength < 0) {
            const [integers, decimals] = severIntegersAndDecimals(recoverable);
            strength = oldStrength + integers;
            coolingTime = Math.ceil((1 - decimals) * recoveryStrengthTime);
            lastTimeStrength = dayjs(oldLastTimeStrength).add(integers * recoveryStrengthTime, 's');
        } else {
            strength = maxStrength;
        }

        await usersModel.updateByIdP(id, {
            strength,
            lastTimeStrength
        });
    }

    return {
        strength,
        maxStrength,
        coolingTime
    }
}

module.exports = coolingTimeStrength;
