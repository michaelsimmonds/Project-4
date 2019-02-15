import React from 'react'
import axios from 'axios'

import Loading from './Loading'
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
    //If user is logged in, the response will contain only the places
    //that the user doesn't have already chosen
    axios.get('/api/places', {
      headers: Auth.isAuthenticated() ?
        { Authorization: `Bearer ${Auth.getToken()}`} : null
    })
      .then(res => this.setState({ places: res.data }))
  }

  render() {
    if(!this.state.places) return <Loading />
    return(
      <section className="section">
        <h2 className="title is-1">Destinations</h2>


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
