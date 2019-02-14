const router = require('express').Router()
const placesController = require('../controllers/places')
const usersController = require('../controllers/users')
const authController = require('../controllers/auth')

const secureRoute = require('../lib/secureRoute')

router.route('/register')
  .post(authController.register)

router.route('/login')
  .post(authController.login)

router.route('/places')
  .get((req, res, next) => {
    if(req.headers.authorization) secureRoute(req, res, next)
    else next()
  },placesController.index)
  .post(secureRoute, placesController.create)

router.route('/places/:id')
  .get(placesController.show)

router.route('/users')
  .get(usersController.index)

router.route('/users/:id')
  .get(usersController.show)
  .put(secureRoute, usersController.update)

router.route('/places/:id/weather')
  .get(placesController.getWeather)


module.exports = router
