import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <main>
          <h1>Hello World</h1>


        </main>
      </BrowserRouter>
    )
  }
}





ReactDOM.render(
  <App />,
  document.getElementById('root')
)
