const User = require('../models/user')

function indexRoute( req, res ){
  const { fields, ...rest } = req.query
  const select = fields ? fields.split(',') : []
  User
    .find(rest)
    .select(select)
    .then(places => res.status(200).json(places))
}

function showRoute(req, res) {
  User
    .findById(req.params.id)
    .then(places =>res.status(200).json(places))
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
