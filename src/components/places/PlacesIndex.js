import React from 'react'
import axios from 'axios'

import PlaceCard from './PlaceCard.js'
import Auth from '../../lib/Auth'

class PlacesIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      places: []
    }
  }

  componentDidMount() {
    //If user is logged in, only show the place he doesn't have already picked.
    const token = Auth.isAuthenticated ? Auth.getToken() : ''
    axios.get('/api/places', {
      headers: { Authorization: `Bearer ${token}` }
    })
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
