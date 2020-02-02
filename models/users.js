const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const InsSequelize = require('./InsSequelize');

class Users extends Model {

};

Users.init(
    {
        status: {
            type: Sequelize.INTEGER(1),
            COMMENT: '状态'
        },
        openId: {
            type: Sequelize.STRING(64),
        },
        curLevel: {
            type: Sequelize.INTEGER(11),
            COMMENT: '用户等级'
        },
        curPoint: {
            type: Sequelize.INTEGER(11),
            COMMENT: '现在关卡'
        },
        isPass: {
            type: Sequelize.INTEGER(1),
            COMMENT: '是否通关'
        },
        strength: {
            type: Sequelize.INTEGER(11),
            COMMENT: '剩余体力值'
        },
        maxStrength: {
            type: Sequelize.INTEGER(11),
            COMMENT: '体力值上限'
        },
        lastTimeStrength: {
            type: Sequelize.DATE,
            COMMENT: '上一次刷新体力值时间'
        },
    },
    {
        sequelize: InsSequelize,
        modelName: 'user' // 自动添加 's'
    }
);

module.exports = new Users();
