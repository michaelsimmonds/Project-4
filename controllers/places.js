const Place = require('../models/place')
const rp = require('request-promise')

function indexRoute( req, res ){
  Place
    .find()
    .then(places => {
      return places.filter(place => {
        let toBeKept = true
        if(req.currentUser) req.currentUser.places.forEach(el => {
          if(el.equals(place._id)) toBeKept = false
        })
        return toBeKept
      })
    })
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

function getWeatherRoute(req, res) {
  Place
    .findById(req.params.id)
    .then(places => {
      rp.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${places.geog[0]},${places.geog[1]}`, {
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
  getWeather: getWeatherRoute
}
