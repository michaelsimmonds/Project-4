/* global api, describe, it, expect, after, beforeEach */

const Place = require('../../models/place')
const User = require('../../models/user')

const { mockPlaceData } = require('../mock_data')

describe('GET /places', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Place.remove({})
    ])
      .then(() => Place.create(mockPlaceData))
      .then(() => done())
  })


  it('should return a 200 response', done => {
    api
      .get('/api/places')
      .expect(200, done)
  })

  it('should return an array of places', done => {
    api
      .get('/api/places')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        res.body.forEach(place => {
          expect(place).to.include.keys([
            'name',
            'country',
            'image',
            'descriptLong',
            'descriptShort',
            'geog'
          ])
        })
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .get('/api/places')
      .end((err, res) => {
        res.body.forEach((place, i) => {
          expect(place.name).to.eq(mockPlaceData[i].name)
          expect(place.country).to.eq(mockPlaceData[i].country)
          expect(place.image).to.eq(mockPlaceData[i].image)
          expect(place.descriptLong).to.eq(mockPlaceData[i].descriptLong)
          expect(place.descriptShort).to.eq(mockPlaceData[i].descriptShort)
          expect(place.geog).to.deep.eq(mockPlaceData[i].geog)
        })
        done()
      })
  })

  after(done => {
    Place.remove({})
      .then(() =>  done())
  })
  
})
