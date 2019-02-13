import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'
import Flash from '../../lib/Flash'

class PlacesShow extends React.Component {

  constructor() {
    super()

    this.state = {}
    this.addPlaceToMyTrip = this.addPlaceToMyTrip.bind(this)
    this.removePlaceToMyTrip = this.removePlaceToMyTrip.bind(this)

  }

  addPlaceToMyTrip(){

    const user = Auth.getPayload()
    console.log(user, this.props.match.params.id)
    axios
      .put(`/api/users/${user.sub}`, {place: this.props.match.params.id, action: 'add'}, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        Flash.setMessage('success', 'New trip added to you dashboard')
        this.props.history.push('/dashboard')
      })
  }
  removePlaceToMyTrip(){
    const user = Auth.getPayload()
    console.log(user, this.props.match.params.id)
    axios
      .put(`/api/users/${user.sub}`, {place: this.props.match.params.id, action: 'remove'}, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        Flash.setMessage('success', 'New trip remove from you dashboard')
        this.props.history.push('/dashboard')
      })
  }

  componentDidMount() {
    axios.get(`/api/places/${this.props.match.params.id}`)
      .then(res => this.setState({ place: res.data }))

  }


  render() {
    console.log(this.props.location.pathname.includes('user'))
    if(!this.state.place) return null
    const { name, country, image, descriptLong } = this.state.place
    return(
      <section className="section">
        <div className="container">
          <h2 className="title is-1">{name}</h2>
          {Auth.isAuthenticated() &&
            !this.props.location.pathname.includes('user') &&
              <button
                className="button"
                id="add"
                onClick={this.addPlaceToMyTrip}>Add to My Trip</button>
          }
          {Auth.isAuthenticated() &&
            this.props.location.pathname.includes('user') &&
              <button
                className="button"
                id="remove"
                onClick={this.removePlaceToMyTrip}>Remove From My Trip</button>
          }
          <div className="columns">
            <div className="column">
              <figure className="image" id="show-image" style={{backgroundImage: `url(${image})`}} alt={name} />
            </div>

            <div className="column">
              <h4 className="title is-4">Country</h4>
              <p>{country}</p>


              <h4 className="title is-4">Budget</h4>
              <p>£20/day</p>


              <h4 className="title is-4">Best time to visit</h4>
              <p>July to October</p>



            </div>
          </div>
        </div>
        <div className="container" id="show-description">
          <h4 className="title is-4">Description</h4>
          <p>{descriptLong}</p>
        </div>

        <div className="container">
          <div className="map">MAP GOES HERE</div>
        </div>
      </section>

    )
  }
}

export default PlacesShow
