const Sequelize = require('sequelize')
const config = require('../config')

module.exports = new Sequelize(config.mysql.db, config.mysql.user, config.mysql.pass, {
  host: config.mysql.host,
  port: config.mysql.port,
  dialect: 'mysql',
  pool: {
    max: 3,
    min: 0,
    idle: 1000
  }
})
