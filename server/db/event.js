const Sequelize = require('sequelize')
const Op = Sequelize.Op
const util = require('../db/util')
const moment = require('moment')
const debug = require('debug')('task-list:db:event')

const Event = util.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  openId: {
    type: Sequelize.STRING(100),
    allowNull: false,
    field: 'open_id'
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
  }, {
    fields: ['open_id']
  }]
})

function addEvent (event) {
  // await Event.sync({force: true})
  return Event.create(event)
}

/**
* @Description
* @Param openId offset limit date
* @Return
*/
function eventList (options) {
  let op = Object.assign(options, {limit: 20, offset: 0, date: new Date()})
  debug(`table events find with ${JSON.stringify(op)}`)
  return Event.findAll({
    where: {
      openId: op.openId,
      // createdAt: { // 00:00 <= > 24:00
      //   [Op.gte]: moment(op.date).startOf('day'),
      //   [Op.lt]: moment(op.date).endOf('day')
      // },
      beginTime: {
        [Op.lt]: moment(op.date).endOf('day')
      },
      endTime: {
        [Op.gte]: moment(op.date).startOf('day')
      }
    },
    order: [
      ['createdAt', 'ASC']
    ],
    limit: op.limit,
    offset: op.offset
  })
}

module.exports = {
  addEvent,
  eventList
}
