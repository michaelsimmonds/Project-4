import React from 'react'
import axios from 'axios'
import moment from 'moment'
import 'weather-icons/css/weather-icons.css'
import { Link } from 'react-router-dom'

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
      weather: ''
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
    const userHasPlace = this.props.location.pathname.includes('user')
    if(!this.state.place) return <Loading />
    const { name, country, image, descriptLong, budget1, budget2, budget3 } = this.state.place
    if(!this.state.weather) return <Loading />
    return(
      <section className="section">
        <div className="container">
          <h2 className="title is-1">{name}</h2>

          <div className="columns">

            <div className="column is-half">
              <div id="show-image" style={{backgroundImage: `url(${image})`}} alt={name} />
            </div>

            <div className="column is-half">

              {Auth.isAuthenticated() &&
              <button
                className="button button-add-remove"
                onClick={this.updatePlaceToMyTrip}>{userHasPlace ? 'Remove From' : 'Add To'} My Trip</button>
              }

              <h4 className="title is-4">Country</h4>
              <hr />
              <p>{country}</p>

              <div id="show-description">
                <div>
                  <h4 className="title is-4">Description</h4>
                  <hr />
                  <p className="descriptLong">{descriptLong}</p>
                </div>
              </div>

              {!Auth.isAuthenticated()  &&
              <Link to ="/register" className="button">Find out more</Link>}



              {Auth.isAuthenticated()  &&
              <h4 className="title is-4">Budget</h4>}
              {Auth.isAuthenticated()  && <hr />}
              {Auth.isAuthenticated()  &&
                <div className="level">
                  <p><span>Shoe-String:</span> £{budget1}/day</p>
                  <p><span>Mid-Range:</span> £{budget2}/day</p>
                  <p><span>Luxury:</span> £{budget3}/day</p>
                </div>}


            </div>
          </div>
        </div>

        {Auth.isAuthenticated() &&
        <div className="container level weather">
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


        {Auth.isAuthenticated()  &&
        <div className="container">
          <div className="columns">
            <div className="column is-half">


              <div className="comments">
                <form onSubmit={this.handleCommentSubmit}>
                  <div className="field">
                    <input
                      className="textarea"
                      name="commentText"
                      placeholder="Add a comment..."
                      value={this.state.text}
                      onChange={this.handleCommentChange}
                    />
                  </div>
                  <button className="button">Submit</button>
                </form>
              </div>


              <h4 className="title is-4">Comments</h4>
              <hr />
              {this.state.place.comments && this.state.place.comments.map(comment =>
                <div key={comment._id}>
                  <PlacesComment comment={comment}/>
                </div>
              )}

            </div>


            <div className="column is-half">
              {this.state.twitter.map((tweet, index) =>
                <TwitterCard key={index} {...tweet} />
              )}
            </div>
          </div>
        </div>}


      </section>
    )
  }
}

export default PlacesShow
