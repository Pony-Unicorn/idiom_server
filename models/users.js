const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const InsSequelize = require('./InsSequelize');

class Users extends Model {

    /**
     * @param {string} account 
     */
    getPasswordByAccount(account) {
        return Users.findOne({ where: { account } });
    }
};

Users.init(
    {
        account: { // 账户
            type: Sequelize.STRING(10)
        },
        password: { // 密码
            type: Sequelize.STRING(100)
        },
        created_at: { // 创建时间
            type: Sequelize.STRING(20)
        }
    },
    {
        sequelize: InsSequelize,
        modelName: 'user' // 自动添加 's'
    }
);

module.exports = new Users();
