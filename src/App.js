import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { deliveryAccessToken, spaceId } from './config'
import { createClient }  from 'contentful'
import Header from './Header'
import About from './About'
import Home from './Home'
import IndexView from './IndexView'

import './styles/application.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.client = createClient({
      space: spaceId,
      accessToken: deliveryAccessToken
    })
  }

  componentDidMount () {

  }

  render() {

    const globalProps = {
      client: this.client,
    }

    return (
      <Router>
        <div>
          <Header {...globalProps} />
          <Route path={'/index'} {...globalProps}  component={IndexView} />
          <Route path={'/about'} {...globalProps}  component={About} />
          <Route path="/" exact {...globalProps}  component={Home} />
        </div>
      </Router>
    )
  }
}
