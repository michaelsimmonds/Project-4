const router = require('express').Router()
const placesController = require('../controllers/places')
const usersController = require('../controllers/users')
const authController = require('../config/auth')

const secureRoute = require('../lib/secureRoute')

router.route('/register')
  .post(authController.register)

router.route('/login')
  .post(authController.login)

router.route('/places')
  .get((req, res, next) => {
    if(req.headers.authorization === 'Bearer null'){
      console.log(req.headers)
      console.log('yeah')
      secureRoute(req,res,next)
    }
  },placesController.index)
  .post(secureRoute, placesController.create)

router.route('/places/:id')
  .get(placesController.show)

router.route('/users')
  .get(usersController.index)

router.route('/users/:id')
  .get(usersController.show)
  .put(secureRoute, usersController.update)


module.exports = router
