import React from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import Flash from '../../lib/Flash'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/register', this.state.data)
      .then((res) => {
        Flash.setMessage('success', res.data.message)
        this.props.history.push('/login')
      })
      .catch(() => {
        Flash.setMessage('danger', 'Registration failed')
        this.props.history.push('/register')
      })
  }


  handleChange({target: {name, value }}) {
    const data = {...this.state.data, [name]: value }
    this.setState({ data })
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state.data
    return(
      <main className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <form onSubmit={this.handleSubmit}>
                <h2 className="title">Register</h2>
                <div className="field">
                  <label className="label">Username</label>
                  <input
                    className="input"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <input
                    className="input"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <input
                    className="input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <input
                    className="input"
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={this.handleChange}
                  />
                </div>
                <button className="button">Submit</button>
                <Link to="/login">
                <button className="button register">Already Registered?</button> </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Register
