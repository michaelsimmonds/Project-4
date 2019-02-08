const Place = require('../models/place')

function indexRoute( req, res ){
  const { fields, ...rest } = req.query
  const select = fields ? fields.split(',') : []
  Place
    .find(rest)
    .select(select)
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
    .then(places =>res.status(201).json(places))
}


module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute
}
