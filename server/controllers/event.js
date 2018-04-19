const event  = require('../db/event')
const debug = require('debug')('task-list:event')

module.exports = async (ctx, next) => {
  let openId = ctx.state.$wxInfo.userinfo.openId
  let e = Object.assign(ctx.request.body, { openId })
  debug(`add event ${JSON.stringify(e)}`)
  let data = await event.addEvent(e)
  ctx.state.data = data
  next()
}
