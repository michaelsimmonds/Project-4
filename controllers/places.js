const rp = require('request-promise')
const Twitter = require('twitter')
const Place = require('../models/place')

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

function getTwitterCommentsRoute(req, res) {
  console.log(req.params)
  Place
    .findById(req.params.id)
    .then(place => {
      const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      })
      const data = []
      return client.get(`search/tweets.json?q=${place.name}&include_entities=1`, function(error, tweets, response) {
        if (!error) {
          Object.keys(tweets.statuses).map(tweet => {
            const newTweet = {
              screenName: tweets.statuses[tweet].user.screen_name,
              image: tweets.statuses[tweet].user.profile_image_url,
              name: tweets.statuses[tweet].user.name,
              text: tweets.statuses[tweet].text,
              created: tweets.statuses[tweet].created_at
            }
            console.log(newTweet)
            data.push(newTweet)
          })
        }
        res.status(200).send(data)
      })
    })
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  commentCreate: commentCreateRoute,
  getWeather: getWeatherRoute,
  getTwitterComments: getTwitterCommentsRoute
}
