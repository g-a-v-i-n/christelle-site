import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Header from './Header'
import About from './About'
import Home from './Home'
import IndexView from './IndexView'

import './styles/application.css'

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path={'/index'} component={IndexView} />
        <Route path={'/about'} component={About} />
        <Route path="/" exact component={Home} />
      </div>
    </Router>
  )
}
