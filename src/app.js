import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'
import './style.scss'

import NavBar from './components/common/NavBar'
import Home from './Home'
import PlacesShow from './components/places/PlacesShow'
import PlacesIndex from './components/places/PlacesIndex'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <main>
          <NavBar />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/places/:id" component={PlacesShow} />
            <Route path="/places" component={PlacesIndex} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>

        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
