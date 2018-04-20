const sequelize = require('sequelize')
const DataTypes = sequelize.DataTypes
const Op = sequelize.Op
const util = require('../db/util')
const moment = require('moment')
const debug = require('debug')('task-list:db:event')

const EventRepeatRule = util.define('event_repeat_rule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  repeatStart: {
    type: DataTypes.DATE,
    defaultValue: null,
    comment: 'repeat start time'
  },
  repeatEnd: {
    type: DataTypes.DATE,
    defaultValue: null,
    comment: 'repeat end time'
  },
  repeatInterval: {
    type: DataTypes.STRING,
    defaultValue: null,
    comment: '重复时间间隔'
  },
  repeatYear: {
    type: DataTypes.STRING,
    defaultValue: null,
    comment: '重复的年'
  },
  repeatMonth: {
    type: DataTypes.STRING,
    defaultValue: null,
    comment: '重复的月'
  },
  repeatDay: {
    type: DataTypes.STRING,
    defaultValue: null,
    comment: '重复的月的 天'
  },
  repeatWeek: {
    type: DataTypes.STRING,
    defaultValue: null,
    comment: '月的第几周'
  },
  repeatWeekDay: {
    type: DataTypes.STRING,
    defaultValue: null,
    comment: '周的第几天'
  }
})

const Event = util.define('event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
    // references: {
    //   model: EventRepeatRule,
    //   key: 'id'
    // }
  },
  openId: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  beginTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fullDay: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  noticeTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: 'timestamp + stead of after begin date, - stead of before begin date'
  }
}, {
  indexes: [{
    fields: ['open_id']
  }]
})

Event.hasOne(EventRepeatRule, {
  constraints: false
})

async function addEvent (event) {
  await EventRepeatRule.sync({force: true})
  await Event.sync({force: true})
  return Event.create(event).then((e) => {
    let rule = {
      eventId: e.id,
      repeatStart: e.beginTime,
      repeatInterval: 1
    }
    debug(JSON.stringify(rule))
    EventRepeatRule.create(rule)
  })
}

function eventStatusSql(options) {
  let op = Object.assign(options, {limit: 20, offset: 0, date: new Date()})
  debug(`table events find with ${JSON.stringify(op)}`)
  let date = moment(op.date)
  let endOf = date.endOf('day')
  let startOf = date.startOf('day')
  let year = date.year()
  let month = date.month()
  let day = date.daysInMonth()
  let week = date.week()
  let weekday = date.weekday()

  let diffSecond = sequelize.fn('TIMESTAMPDIFF', sequelize.literal('MICROSECOND'), sequelize.col('repeat_start'), op.date)
  let mod = sequelize.fn('MOD', diffSecond, sequelize.col('repeat_interval'))
  return {
    where: {
      openId: op.openId
    },
    include: [
      {
        model: EventRepeatRule,
        where: sequelize.or(sequelize.where(mod, 0), sequelize.and({
          repeatYear: {
            [Op.or]: [year.toString(), '*']
          },
          repeatMonth: {
            [Op.or]: [month.toString(), '*']
          },
          repeatDay: {
            [Op.or]: [day.toString(), '*']
          },
          repeatWeek: {
            [Op.or]: [week.toString(), '*']
          },
          repeatWeekDay: {
            [Op.or]: [weekday.toString(), '*']
          },
          repeatStart: {
            [Op.lte]: endOf
          }
        }))
      }
    ],
    order: [
      ['createdAt', 'ASC']
    ],
    limit: op.limit,
    offset: op.offset
  }
}

// Post.findAll({
//   where: sequelize.where(sequelize.fn('char_length', sequelize.col('status')), 6)
// });
// SELECT * FROM post WHERE char_length(status) = 6;
// $sql = "SELECT EV.*
// FROM `events` EV
// RIGHT JOIN `events_meta` EM1 ON EM1.`event_id` = EV.`id`
// WHERE ( DATEDIFF( '$nowString', repeat_start ) % repeat_interval = 0 )
// OR (
//   (repeat_year = $year OR repeat_year = '*' )
// AND
// (repeat_month = $month OR repeat_month = '*' )
// AND
// (repeat_day = $day OR repeat_day = '*' )
// AND
// (repeat_week = $week OR repeat_week = '*' )
// AND
// (repeat_weekday = $weekday OR repeat_weekday = '*' )
// AND repeat_start <= DATE('$nowString')
// )";

/**
* @Description
* @Param openId offset limit date
* @Return
*/
function eventList (options) {
  return Event.findAll(eventStatusSql(options))
  // let op = Object.assign(options, {limit: 20, offset: 0, date: new Date()})
  // debug(`table events find with ${JSON.stringify(op)}`)
  // let day = moment(op.date)
  // let endOf = day.endOf('day')
  // let startOf = day.startOf('day')
  // return Event.findAll({
  //   where: {
  //     openId: op.openId,
  //     // createdAt: { // 00:00 <= > 24:00
  //     //   [Op.gte]: moment(op.date).startOf('day'),
  //     //   [Op.lt]: moment(op.date).endOf('day')
  //     // },
  //     beginTime: {
  //       [Op.lt]: endOf
  //     },
  //     endTime: {
  //       [Op.gte]: startOf
  //     }
  //   },
  //   order: [
  //     ['createdAt', 'ASC']
  //   ],
  //   limit: op.limit,
  //   offset: op.offset
  // })
}

function eventStatus (year, month) {
  return
}

module.exports = {
  addEvent,
  eventList,
  eventStatus
}
