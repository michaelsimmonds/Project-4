import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import PlaceForm from './PlaceForm'

class PlacesNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        name: '',
        country: '',
        image: '',
        descriptLong: '',
        descriptShort: '',
        geog: []
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.suggestionSelect = this.suggestionSelect.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value}
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/places', this.state.data,
        { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.props.history.push('/places'))
      .catch(err => alert(err.message))
  }

  suggestionSelect(result, lat, lng ) {
    const data = {...this.state.data, geog: [ parseFloat(lat), parseFloat(lng)]}
    const errors = {...this.state.errors, geog: ''}
    this.setState({ data, errors })
  }

  render() {
    return(
      <main className="section">
        <div className="container">
          <PlaceForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            suggestionSelect={this.suggestionSelect}
          />
        </div>
      </main>
    )
  }
}

export default PlacesNew
