const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, required: true },
  descriptLong: { type: Number, required: true },
  descriptShort: { type: String, required: true},
  geog: { type: Array, required: true }
})

module.exports = mongoose.model('Place', placeSchema)
