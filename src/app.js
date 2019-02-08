import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'
import './style.scss'

import NavBar from './components/common/NavBar'
import Home from './Home'
import PlacesIndex from './components/places/PlacesIndex'
import PlacesShow from './components/places/PlacesShow'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <main>
          <NavBar />
          <Switch>
            <Route path="/places/:id" component={PlacesShow} />
            <Route path="/places" component={PlacesIndex} />
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
