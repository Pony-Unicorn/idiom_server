const { readFilePromise } = require('../utils/Utils');
/**
 * 游戏配置文件
 */
const gameConf = {

}

/**
 * 初始化配置文件
 * @param {Array<string>} fileList 
 */
const init = async fileList => {
    for (let i = 0, l = fileList.length; i < l; i++) {
        const fileName = fileList[i];
        const file = await readFilePromise(`${__dirname}/${fileName}.json`);
        gameConf[fileName] = file;
    }
}

const get = fileName => gameConf[fileName];

module.exports = {
    init,
    get
}