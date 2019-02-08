import React from 'react'
import { Link, withRouter } from 'react-router-dom'


class NavBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      navbBarOpen: false
    }
    this.toggleNavBar = this.toggleNavBar.bind(this)
  }

  toggleNavBar() {
    this.setState({ navBarOpen: !this.state.navBarOpen })
  }


  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navBarOpen: false })
    }
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">

            <Link className="navbar-item" to="/">
              <strong>Home</strong>
            </Link>

            <a
              className={`navbar-burger ${this.state.NavBarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavBar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navBarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/places">Discover</Link>
              <Link className="navbar-item" to="/register">Register</Link>
              <Link className="navbar-item" to="/login">Login</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
