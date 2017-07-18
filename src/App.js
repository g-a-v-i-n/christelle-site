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
      biography: '',
      contact: '',
      clientList: [],
      galleryProjects: [],
    }
    this.client = createClient({
      space: spaceId,
      accessToken: deliveryAccessToken
    })
  }

  getAboutContent = () => {
    if (this.state.biography === '') {
      this.client.getEntry('2bqR4gkUxKqMSwC6q8GQKu')
      .then((entry) => {
        this.setState({
          biography: entry.fields.biography,
          contact: {
            email: entry.fields.email,
            phoneNumber: entry.fields.phoneNumber,
            instagram: entry.fields.instagram,
          },
          clientList: entry.fields.clientList,

        })
      })
      .catch((err) => { console.log('error:', err) })
    }
  }

  getHomeGallery = () => {
    console.log('getting Gallery Projetcs')
      this.client.getContentType('galleryTest')
      .then((contentType) => console.log(contentType))
      .catch((err) => { console.log('error:', err) })
  }


  render() {
    const homeProps = {
      getHomeGallery: this.getHomeGallery,
      projects: this.state.projects,
    }
    const aboutProps = {
      getAboutContent:this.getAboutContent,
      biography: this.state.biography,
      contact: this.state.contact,
      clientList: this.state.clientList,
    }

    return (
      <Router>
        <div>
          <Header {...this.props} />
          <Route exact path='/about' render={(props) => (
            <About {...props} {...aboutProps} />
          )}/>
          <Route exact path='/' render={(props) => (
            <Home {...props} {...homeProps} />
          )}/>
        </div>
      </Router>
    )
  }
}
