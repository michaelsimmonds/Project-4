const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  text: { type: String, required: true, maxlength: 250}
},{
  timestamps: true
})

const placeSchema = new mongoose.Schema({
  name: { type: String, required: 'Name required' },
  country: { type: String, required: 'Country required' },
  image: { type: String, required: 'Image url required' },
  descriptLong: { type: String, required: 'Long description required' },
  descriptShort: { type: String, required: 'Short description required'},
  geog: { type: Array, required: 'Lat/lng required, in array form: [lat, lng]' },
  budget1: { type: String },
  budget2: { type: String },
  budget3: { type: String },
  comments: [ commentSchema ]
})

module.exports = mongoose.model('Place', placeSchema)
