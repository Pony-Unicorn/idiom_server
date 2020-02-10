const log4js = require('log4js');

log4js.configure({
    appenders: {
        errorLogs: { type: 'file', filename: './logs/log4js_error.log', pattern: '.yyyy-MM-dd' }, // 错误日志文件
        commonlyLogs: { type: 'file', filename: './logs/log4js_commonly.log', pattern: '.yyyy-MM-dd' }, // 一般性日志文件
        transferLogs: { type: 'file', filename: './logs/log4js_transfer.log', pattern: '.yyyy-MM-dd' }, // 转账日志文件
        whiteLogs: { type: 'file', filename: './logs/log4js_white.log', pattern: '.yyyy-MM-dd' }, // 白名单日志文件
        console: { type: 'console' }
    },
    categories: {
        loggerError: { appenders: ['errorLogs', 'console'], level: 'error' },
        loggerCommonly: { appenders: ['commonlyLogs', 'console'], level: 'trace' },
        loggerTransfer: { appenders: ['transferLogs', 'console'], level: 'trace' },
        loggerWhite: { appenders: ['whiteLogs', 'console'], level: 'trace' },
        default: { appenders: ['console'], level: 'trace' }
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
});

const loggerError = log4js.getLogger('loggerError');
const loggerCommonly = log4js.getLogger('loggerCommonly');
const loggerTransfer = log4js.getLogger('loggerTransfer');
const loggerWhite = log4js.getLogger('loggerWhite');

module.exports = {
    loggerError,
    loggerCommonly,
    loggerTransfer,
    loggerWhite
};
