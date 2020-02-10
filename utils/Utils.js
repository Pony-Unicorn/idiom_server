const fs = require('fs');
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

/**
 * 读取文件，包装成 Promise 形式
 * 读取的文件结果自动调用 JSON.stringify 方法序列化
 * @param {string} path 
 */
const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

/**
 * 写入文件，包装成 Promise 形式
 * 写入文件时候自动调用 JSON.stringify 方法序列化 data
 * @param {string} path 
 * @param {*} data 
 */
const writeFilePromise = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * 删除文件
 * @param {string} path 
 */
const deleteFilePromise = path => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * 
 * @param {string} path 
 */
const getStatPromise = path => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    stats,
                    filePath: path
                });
            }
        });
    });
}

const readDirPromise = path => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

/**
 * 删除 path 目录下所有文件，不包括 '.' 和 '..'）。
 * @param {string} path 
 */
const deleteDirPromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            if (err) {
                reject(err);
            } else {

                const allPromise = [];

                data.forEach(subPath => {
                    getStatPromise(`${path}${subPath}`).then(res => {
                        if (!res.stats.isDirectory()) {
                            allPromise.push(deleteFilePromise(res.filePath));
                        }
                    });
                });

                Promise.all(allPromise).then(resolve, reject);
            }
        })
    });
}

module.exports = {
    sleep,
    sendJSONresponse,
    calculationPassWdHash,
    readFilePromise,
    writeFilePromise,
    readDirPromise,
    deleteDirPromise,
    deleteFilePromise,
    getStatPromise
}
