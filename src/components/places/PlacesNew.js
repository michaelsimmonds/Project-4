import React from 'react'
import axios from 'axios'

import PlaceForm from './PlaceForm'

class PlacesNew extends React.Component {
  constructor() {
    super()

    this.state = {}

  }

  suggestionSelect(result, lat, lng ) {
    const data = {...this.state.data,
      location: {
        lat: lat,
        lng: lng
      }
    }
    const errors = {...this.state.errors, location: ''}
    this.setState({data, errors})
  }

  render() {
    return(
      <main className="section">
        <div className="container">
          <PlaceForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </main>
    )
  }
}

export default PlacesNew
