const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('task-list')
const response = require('./middlewares/response')
const config = require('./config')

app.use(response)

const router = require('./router')
app.use(router.routes())

app.listen(config.port, () => debug(`listening on port ${config.port}`))
