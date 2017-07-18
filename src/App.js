import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { deliveryAccessToken, spaceId } from './config'
import { createClient }  from 'contentful'
import Header from './Header'
import About from './About'
import Home from './Home'
import './styles/application.css'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      heading: '',
      biography: '',
      contact: '',
      clientList: [],
      pressList: [],
      exhibitionsList: [],
      portrait: '',
      projectList: null,
      error: false,
      filterQuery: false,
      menuOpen: false,
      menuTitles: ['Index', 'Photo', 'Video']
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
          let portrait = entry.fields.portrait.sys.id
          this.client.getAsset(portrait).then((response) => {
            this.setState({
              portrait: response.fields.file,
            })
          })
        this.setState({
          biography: entry.fields.biography,
          contact: {
            email: entry.fields.email,
            phoneNumber: entry.fields.phoneNumber,
            instagram: entry.fields.instagram,
          },
          clientList: entry.fields.clientList,
          pressList: entry.fields.pressList,
          exhibitionsList: entry.fields.exhibitionsList,
        })
      })
      .catch(this.setState({
        error: true,
      }))
    }
  }

  getGalleryContent = () => {
    if (this.state.projectList === null) {
      this.client.getEntries({ content_type: 'galleryTest' })
      .then((response) => {
        this.setState({
          projectList: response,
        })
      })
      .catch(
        this.setState({
        error: true,
      })
    )}
  }

  setFilterQuery = (e, filterQuery) => {
    e.preventDefault()
    e.stopPropagation()
    let menuTitles = this.state.menuTitles
    const from = menuTitles.indexOf(filterQuery)
    const to = 0
    menuTitles.splice(to, 0, menuTitles.splice(from, 1)[0]);
    this.setState({
      filterQuery,
      menuOpen: !this.state.menuOpen,
      menuTitles,
    })
  }

  render() {
    const homeProps = {
      getGalleryContent: this.getGalleryContent,
      projectList: this.state.projectList,
      filterQuery: this.state.filterQuery,
    }

    const aboutProps = {
      getAboutContent:this.getAboutContent,
      biography: this.state.biography,
      contact: this.state.contact,
      clientList: this.state.clientList,
      pressList: this.state.pressList,
      exhibitionsList: this.state.exhibitionsList,
      portrait: this.state.portrait,
    }

    const headerProps = {
      setFilterQuery:this.setFilterQuery,
      menuOpen:this.state.menuOpen,
      menuTitles:this.state.menuTitles,
    }

    return (
      <Router>
        <div>
          <Header {...this.props} {...headerProps} />
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
