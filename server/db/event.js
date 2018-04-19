const Sequelize = require('sequelize')
const util = require('../db/util')

const Event = util.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  beginTime: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'begin_time'
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'end_time'
  }
}, {
  indexes: [{
    unique: true,
    fields: ['id']
  }]
})

function addEvent (event) {
  Event.sync()
  return Event.create(event)
}

module.exports = {
  addEvent
}
