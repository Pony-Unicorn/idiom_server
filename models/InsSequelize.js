const Sequelize = require('sequelize');

const config = require('../config');

const dbConf = config.get('MySQL');

const InsSequelize = new Sequelize(dbConf.database, dbConf.user, dbConf.password, {
    host: dbConf.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: true
    },
    timezone: '+08:00',
    logging: dbConf.sequelizeLogging
});

module.exports = InsSequelize;
