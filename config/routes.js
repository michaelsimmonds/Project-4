const router = require('express').Router()
const placesController = require('../controllers/places')
const authController = require('../config/auth')

const secureRoute = require('../lib/secureRoute')

router.route('/register')
  .post(authController.register)

router.route('/login')
  .post(authController.login)

router.route('/places')
  .get(placesController.index)
  .post(secureRoute, placesController.create)

router.route('/places/:id')
  .get(placesController.show)

module.exports = router
