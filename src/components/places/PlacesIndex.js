import React from 'react'
import axios from 'axios'

import PlaceCard from './PlaceCard.js'

class PlacesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      places: []
    }
  }

  componentDidMount() {
    axios.get('/api/places')
      .then(res => this.setState({ places: res.data }))

  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.places.map(place =>
              <div className="column is-one-quarter" key={place._id}>
                <PlaceCard {...place} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default PlacesIndex
