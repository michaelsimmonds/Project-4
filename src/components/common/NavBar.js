import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'

class NavBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      navbBarOpen: false
    }
    this.toggleNavBar = this.toggleNavBar.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleNavBar() {
    this.setState({ navBarOpen: !this.state.navBarOpen })
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
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
            <Link className="navbar-item" to="/places">Discover</Link>
            {Auth.isAuthenticated() &&
              <Link className="navbar-item" to="/dashboard">MyTrip</Link>}

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

              {Auth.isAuthenticated() && <Link className="navbar-item" to="/places/new">Add Place</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
