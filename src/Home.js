import React from 'react'

import { Link } from 'react-router-dom'

class Home extends React.Component{
  constructor() {
    super()

    this.state = {}
    this.updateBg = this.updateBg.bind(this)
  }

  updateBg(){
    const rndm = Math.random()
    const num = Math.floor(rndm*6)
    this.setState({bg: num})
    setTimeout(this.updateBg, 1000*10)
  }

  componentDidMount(){
    this.updateBg()
  }

  render() {
    return(
      <section className={`bg bg-${this.state.bg}`}>
        <div className="hero-body">
          <div className="container">
            <Link to="/places">
              <h1 className="title is-1">
              Plan your trip
              </h1>
            </Link>
            <h3 className="title is-1">text here about the purpose of our website</h3>
          </div>
        </div>
      </section>

    )
  }
}

export default Home
