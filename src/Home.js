import React from 'react'

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
            <h1 className="title is-1">
              Plan your trip
            </h1>
          </div>
        </div>
      </section>

    )
  }
}

export default Home
