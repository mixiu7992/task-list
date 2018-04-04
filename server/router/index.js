const router = require('koa-router')
const controllers = require('../controller')

const {auth: { authorizationMiddleware, validationMiddleware }} = require('../qcloud')

router.get('/login', authorizationMiddleware, controllers.login)

router.get('/user', validationMiddleware, controllers.user)

module.exports = router
