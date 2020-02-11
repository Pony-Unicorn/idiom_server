const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const InsSequelize = require('./InsSequelize');

class Shares extends Model {

    addRecordP(record) {
        return Shares.create(record);
    }

    findByIdP(id) {
        return Shares.findByPk(id);
    }

};

Shares.init(
    {
        inviter: {
            type: Sequelize.INTEGER(11),
            COMMENT: '邀请人'
        },
        beInvited: {
            type: Sequelize.INTEGER(11),
            unique: 'u_be_invited',
            COMMENT: '被邀请人'
        }
    },
    {
        sequelize: InsSequelize,
        modelName: 'share' // 自动添加 's'
    }
);

module.exports = new Shares();
