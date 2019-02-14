const Place = require('../models/place')
const rp = require('request-promise')

function indexRoute( req, res ){
  Place
    .find()
    .then(places => places.filter(place => {
      if(req.currentUser) {
        //return false if user already added place to his trip
        return !req.currentUser.places.some(userPlace => userPlace.equals(place._id))
      } else return true
    })
    )
    .then(places => res.status(200).json(places))
}

function createRoute( req, res ){
  Place
    .create(req.body)
    .then(places => res.status(201).json(places))
    .catch(err => res.status(422).json(err.errors))
}

function showRoute(req, res) {
  Place
    .findById(req.params.id)
    .then(places =>res.status(200).json(places))
}

function commentCreateRoute(req, res) {
  req.body.user = req.currentUser

  Place
    .findById(req.params.id)
    .then(place => {
      place.comments.push(req.body)
      return place.save()
    })
    .then(place => res.status(201).json(place))
}

function getWeatherRoute(req, res) {
  Place
    .findById(req.params.id)
    .then(place => {
      rp.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${place.geog[0]},${place.geog[1]}`, {
        json: true,
        qs: { units: 'si'}
      })
        .then(data => res.json(data))
    })
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  commentCreate: commentCreateRoute,
  getWeather: getWeatherRoute
}
