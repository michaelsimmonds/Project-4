import React from 'react'
import axios from 'axios'


class PlacesShow extends React.Component {

  constructor() {
    super()

    this.state = {}

  }

  componentDidMount() {
    axios.get(`/api/places/${this.props.match.params.id}`)
      .then(res => this.setState({ place: res.data }))

  }


  render() {
    if(!this.state.place) return null
    const { name, country, image, descriptLong } = this.state.place
    return(
      <section className="section">
        <div className="container">
          <h2 className="title is-1">{name}</h2>
          <hr />

          <div className="columns">
            <div className="column">
              <figure className="image" style={{backgroundImage: `url(${image})`}} alt={name} />
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
        <div className="container">
          <h4 className="title is-4">Description</h4>
          <p>{descriptLong}</p>
        </div>
      </section>

    )
  }
}

export default PlacesShow
