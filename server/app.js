const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('task-list-server')
const response = require('./middlewares/response')
const config = require('./config')
const bodyParser = require('koa-bodyparser')

app.use(response)

app.use(bodyParser())

const router = require('./router')
app.use(router.routes())

app.listen(config.port, () => debug(`listening on port ${config.port}`))
