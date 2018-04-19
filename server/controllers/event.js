const event = require('../db/event')
const debug = require('debug')('task-list:event')

const addEvent = async (ctx, next) => {
  let openId = ctx.state.$wxInfo.userinfo.openId
  let e = Object.assign(ctx.request.body, { openId })
  debug(`add event ${JSON.stringify(e)}`)
  let data = await event.addEvent(e)
  ctx.state.data = data
  next()
}

const eventList = async (ctx, next) => {
  let openId = ctx.state.$wxInfo.userinfo.openId
  let options = Object.assign(ctx.request.body, { openId })
  debug(`fetch list ${JSON.stringify(options)}`)
  ctx.state.data = await event.eventList(options)
  next()
}

module.exports = {
  addEvent,
  eventList
}
