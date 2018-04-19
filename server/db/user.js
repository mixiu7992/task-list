const Sequelize = require('sequelize')
const util = require('../../server/db/util')

const User = util.define('cSessionInfo', {
  openId: {
    type: Sequelize.STRING(100),
    field: 'open_id',
    allowNull: false,
    primaryKey: true
  },
  unionId: {
    type: Sequelize.UUID(100),
    field: 'uuid'
  },
  skey: Sequelize.STRING(100),
  createTime: {
    type: Sequelize.DATE,
    field: 'create_time'
  },
  lastVisitTime: {
    type: Sequelize.DATE,
    field: 'last_visit_time'
  },
  sessionKey: Sequelize.STRING(100),
  userInfo: {
    type: Sequelize.JSON,
    field: 'user_info'
  }},
  { indexes: [
    {
      unique: true,
      fields: ['open_id', 'skey']
    }]
  }
)

exports.addNewUser = function(data) {
  return User.create(data)
}

exports.findUser = function(data) {
  let { openId } = data
  return User.findOne({
    where: {
      openId
    }
  })
}
