const User = require('../models/user')

function indexRoute( req, res ){
  const { fields, ...rest } = req.query
  const select = fields ? fields.split(',') : []
  User
    .find(rest)
    .select(select)
    .populate('places')
    .then(users => res.status(200).json(users))
}

function showRoute(req, res) {
  User
    .findById(req.params.id)
    .populate('places')
    .then(user => res.status(200).json(user))
}

function updateRoute(req, res) {
  //Add a new place to the user place list
  req.currentUser.places.push(req.body.place)
  req.currentUser.save()
    .then(user => User.populate(user, { path: 'places'}))
    .then(user => res.json(user))
  // .then(user => user.set({ places: [...user.places, req.body.places]}))
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute
}
