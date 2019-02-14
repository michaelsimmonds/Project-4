import React from 'react'
import axios from 'axios'
import moment from 'moment'
import 'weather-icons/css/weather-icons.css'

import Loading from './Loading'
import Auth from '../../lib/Auth'
import Flash from '../../lib/Flash'

import PlacesComment from './PlacesComment'
import TwitterCard from './TwitterCard'
class PlacesShow extends React.Component {

  constructor() {
    super()

    this.state = {
      commentText: '',
      place: {
        comments: ''
      },
      weather: '',
      twitter: []
    }
    this.updatePlaceToMyTrip = this.updatePlaceToMyTrip.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

  handleCommentChange({ target: {value}}) {
    this.setState({commentText: value})
  }

  handleCommentSubmit(e) {
    e.preventDefault()
    axios
      .post(`/api/places/${this.props.match.params.id}/comments`, {text: this.state.commentText},
        { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getPlaceDetails())
  }

  updatePlaceToMyTrip(){
    const user = Auth.getPayload()
    axios
      .put(`/api/users/${user.sub}`, {place: this.props.match.params.id}, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        Flash.setMessage('success', 'New trip added to your map')
        this.props.history.push('/dashboard')
      })
  }

  componentDidMount() {
    this.getPlaceDetails()
  }

  getPlaceDetails(){
    axios.get(`/api/places/${this.props.match.params.id}`)
      .then(res => this.setState({ place: res.data }))
    axios.get(`/api/places/${this.props.match.params.id}/weather`)
      .then(res => this.setState({ weather: res.data }))
    axios.get(`/api/places/${this.props.match.params.id}/twitter`)
      .then(res => this.setState({ twitter: res.data }))
  }

  getIconClass(icon) {
    const className = icon.replace('partly-', '')
      .split('-')
      .reverse()
      .join('-')
    if(className === 'day-clear') {
      return 'wi wi-day-sunny is-size-1'
    }
    if(className === 'wind') {
      return 'wi wi-day-windy is-size-1'
    }
    return `wi wi-${className} is-size-1`
  }

  render() {
    console.log(this.state.twitter)
    const userHasPlace = this.props.location.pathname.includes('user')
    if(!this.state.place) return <Loading />
    const { name, country, image, descriptLong, budget1, budget2, budget3 } = this.state.place

    if(!this.state.weather || !this.state.twitter) return <Loading />
    return(
      <section className="section">
        <div className="container">
          <h2 className="title is-1">{name}</h2>

          <div className="columns">

            <div className="column is-two-fifths">
              <div id="show-image" style={{backgroundImage: `url(${image})`}} alt={name} />
            </div>

            <div className="column is-three-fifths">

              {Auth.isAuthenticated() &&
              <button
                className="button button-add-remove"
                onClick={this.updatePlaceToMyTrip}>{userHasPlace ? 'Remove From' : 'Add To'} My Trip</button>
              }

              <h4 className="title is-4">Country</h4>
              <p>{country}</p>
              {Auth.isAuthenticated() && !this.props.location.pathname.includes('user') &&
              <h4 className="title is-4">Budget</h4>}
              {Auth.isAuthenticated() && !this.props.location.pathname.includes('user') &&
              <p><span>Shoe-String:</span> £{budget1}/day</p>}
              {Auth.isAuthenticated() && !this.props.location.pathname.includes('user') && <p><span>Mid-Range:</span> £{budget2}/day</p>}
              {Auth.isAuthenticated() && !this.props.location.pathname.includes('user') &&<p><span>Luxury:</span> £{budget3}/day</p>}

            </div>
          </div>
        </div>



        <div className="container" id="show-description">
          <div>
            <h4 className="title is-4">Description</h4>
            <p className="descriptLong">{descriptLong}</p>
          </div>
        </div>


        <div className="container">
          <h4 className="title is-4">Comments</h4>
          {this.state.place.comments && this.state.place.comments.map(comment =>
            <div key={comment._id}>
              <PlacesComment comment={comment}/>
            </div>
          )}
        </div>

        <div className="container">
          <div className="comments">
            <form onSubmit={this.handleCommentSubmit}>
              <div className="field">
                <label className="label">Add a comment</label>
                <input
                  className="textarea"
                  name="commentText"
                  placeholder="Let us know your thoughts..."
                  value={this.state.text}
                  onChange={this.handleCommentChange}
                />
              </div>
              <button className="button">Submit</button>
            </form>
          </div>
        </div>

        {Auth.isAuthenticated() && !this.props.location.pathname.includes('user') &&
        <div className="level">
          <h4 className="title is-4">Weather at Location</h4>
        </div>}
        {Auth.isAuthenticated() && !this.props.location.pathname.includes('user') &&
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
        </div>}

        {this.state.twitter.map((tweet, index) =>
          <TwitterCard key={index} {...tweet}/>
        )}

      </section>
    )
  }
}

export default PlacesShow
