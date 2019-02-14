import React from 'react'
import axios from 'axios'
import moment from 'moment'
import 'weather-icons/css/weather-icons.css'

import Auth from '../../lib/Auth'
import Flash from '../../lib/Flash'

import PlacesComment from './PlacesComment'

class PlacesShow extends React.Component {

  constructor() {
    super()

    this.state = {
      commentText: '',
      place: {
        comments: ''
      }
    }
    this.addPlaceToMyTrip = this.addPlaceToMyTrip.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange({ target: {value}}) {
    this.setState({commentText: value})
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post(`/api/places/${this.props.match.params.id}/comments`, {text: this.state.commentText},
        { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getPlaceDetails())
      .catch(err => alert(err.message))

    this.getIconClass = this.getIconClass.bind(this)

  }

  addPlaceToMyTrip(){
    const user = Auth.getPayload()
    console.log(user, this.props.match.params.id)
    axios
      .put(`/api/users/${user.sub}`, {place: this.props.match.params.id}, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        Flash.setMessage('success', 'New trip added to you dashboard')
        this.props.history.push('/dashboard')
      })
  }

  componentDidMount() {
    this.getPlaceDetails()
  }

  getPlaceDetails(){
    console.log(this.props.match.params.id)
    axios.get(`/api/places/${this.props.match.params.id}`)
      .then(res => this.setState({ place: res.data }))
    axios.get(`/api/places/${this.props.match.params.id}/weather`)
      .then(res => this.setState({ weather: res.data }))
  }

  getIconClass(icon) {
    const className = icon.replace('partly-', '')
      .split('-')
      .reverse()
      .join('-')

    return `wi wi-${className} is-size-1`
  }


  render() {
    console.log(this.state.place.comments)
    if(!this.state.place) return null
    const { name, country, image, descriptLong, budget1, budget2, budget3 } = this.state.place
    if(!this.state.weather) return null
    return(
      <section className="section">
        <div className="container">
          <h2 className="title is-1">{name}</h2>
          {Auth.isAuthenticated() &&
          <button
            className="button"
            id="add"
            onClick={this.addPlaceToMyTrip}>Add to My Trip</button>}

          <div className="columns">
            <div className="column">
              <figure className="image" id="show-image" style={{backgroundImage: `url(${image})`}} alt={name} />
            </div>

            <div className="column">
              <h4 className="title is-4">Country</h4>
              <p>{country}</p>

              <h4 className="title is-4">Budget</h4>
              <p><span>Shoe-String:</span> £{budget1}/day</p>
              <p><span>Mid-Range:</span> £{budget2}/day</p>
              <p><span>Luxury:</span> £{budget3}/day</p>


              <h4 className="title is-4">Weather</h4>

              <h4 className="title is-4">Best time to visit</h4>
              <p>July to October</p>

            </div>
          </div>
        </div>

        <div className="container" id="show-description">
          <div className="level">
            <h4 className="title is-4">Description</h4>
          </div>
          <p className="descriptLong">{descriptLong}</p>
        </div>


        {this.state.place.comments && this.state.place.comments.map(comment =>
          <div key={comment._id}>
            <PlacesComment comment={comment}/>
          </div>
        )}


        <div className="container">
          <div className="comments">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Comments</label>
                <input
                  className="textarea"
                  name="commentText"
                  placeholder="Add a comment..."
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </div>
              <button className="button">Add Comment</button>
            </form>
          </div>
        </div>

        <div className="level">
          <h4 className="title is-4">Weather at Location</h4>
        </div>
        <div className="container level">
          {this.state.weather.daily.data.map(day =>
            <div key={day.time} >
              <h5>{moment.unix(day.time).format('dddd')}</h5>
              <p>
                <i className={this.getIconClass(day.icon)}></i>
              </p>
              <p className="temp">{Math.round(day.temperatureLow)}°C / {Math.round(day.temperatureHigh)}°C</p>
            </div>
          )}
        </div>

      </section>

    )
  }
}

export default PlacesShow
