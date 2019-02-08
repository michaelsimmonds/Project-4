import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import 'bulma'
import './style.scss'

import NavBar from './components/common/NavBar'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <main>
          <NavBar />


        </main>
      </BrowserRouter>
    )
  }
}





ReactDOM.render(
  <App />,
  document.getElementById('root')
)
