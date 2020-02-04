const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const InsSequelize = require('./InsSequelize');

class Users extends Model {

    addRecordP(user) {
        return Users.create(Object.assign({
            status: 0,
            curLevel: 1,
            curPoint: 1,
            isPass: 0,
            strength: 5,
            maxStrength: 5,
            lastTimeStrength: new Date()
        }, user));
    }

    findByOpenIdP(openId) {
        return Users.findOne({
            where: {
                openId
            }
        });
    }

    findByIdP(id) {
        return Users.findByPk(id);
    }

    updateByOpenIdP(openId, update) {
        return Users.update(update, {
            where: {
                openId
            }
        });
    }

    updatePointByIdP(id) {
        return Users.update(
            {
                curPoint: Sequelize.literal(`cur_point+1`)
            },
            {
                where: {
                    id
                }
            }
        );
    }
};

Users.init(
    {
        status: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            COMMENT: '状态'
        },
        openId: {
            type: Sequelize.STRING(64),
            unique: 'u_open_id'
        },
        sessionKey: {
            type: Sequelize.STRING(64),
        },
        curLevel: {
            type: Sequelize.INTEGER(11),
            defaultValue: 1,
            COMMENT: '用户等级'
        },
        curPoint: {
            type: Sequelize.INTEGER(11),
            defaultValue: 1,
            COMMENT: '现在关卡'
        },
        isPass: {
            type: Sequelize.INTEGER(1),
            defaultValue: 0,
            COMMENT: '是否通关'
        },
        strength: {
            type: Sequelize.INTEGER(11),
            defaultValue: 5,
            COMMENT: '剩余体力值'
        },
        maxStrength: {
            type: Sequelize.INTEGER(11),
            defaultValue: 5,
            COMMENT: '体力值上限'
        },
        lastTimeStrength: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            COMMENT: '上一次刷新体力值时间'
        },
    },
    {
        sequelize: InsSequelize,
        modelName: 'user' // 自动添加 's'
    }
);

module.exports = new Users();
