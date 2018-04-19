const router = require('koa-router')({
  prefix: '/v1'
})

const controllers = require('../controllers')

const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

router.get('/login', authorizationMiddleware, controllers.login)

router.get('/user', validationMiddleware, controllers.user)

router.post('/addEvent', validationMiddleware, controllers.event.addEvent)

router.get('/eventList', validationMiddleware, controllers.event.eventList)

module.exports = router
