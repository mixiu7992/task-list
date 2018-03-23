const router = require('koa-router')({
  prefix: '/weapp'
})
const controllers = require('../controller')

const  { auth: { authorizationMiddlewar, validationMiddleware }} = require()
