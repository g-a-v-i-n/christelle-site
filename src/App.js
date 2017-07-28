import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
      clientList: '',
      pressList: '',
      exhibitionList: '',
      portrait: '',
      projects: [],
      error: false,
      filterQuery: false,
      menuOpen: false,
      menuTitles: ['Index', 'Photo', 'Video'],
    }
    this.client = createClient({
      space: spaceId,
      accessToken: deliveryAccessToken,
    })
  }

  // load bio info immediatly so that there is minimal load time after page transition
  componentWillMount = () => {
    this.getAboutContent()
    this.getGalleryContent()
  }

  // GET for getting all bio page content
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
          clientList: entry.fields.clients,
          pressList: entry.fields.press,
          exhibitionList: entry.fields.exhibitions,
        })
      })
      .catch((reason) => console.error(reason, 'Error getting bio content from contentful'))
    }
  }

  // GET for getting all gallery content
  getGalleryContent = () => {
    if (this.state.projects.length === 0) {
      this.client.getEntries({ content_type: 'galleryTest' })
      .then((response) => {
        this.setState({
          projects: response.items,
        })
      })
      .catch((reason) => console.error(reason, 'Error getting gallery content from contentful'))
    }
  }

  setFilterQuery = (e, filterQuery) => {
    e.preventDefault()
    e.stopPropagation()
    let menuTitles = this.state.menuTitles
    const from = menuTitles.indexOf(filterQuery)
    const to = 0
    menuTitles.splice(to, 0, menuTitles.splice(from, 1)[0])
    this.setState({
      filterQuery,
      menuOpen: !this.state.menuOpen,
      menuTitles,
    })
  }

  render() {
    const homeProps = {
      getGalleryContent: this.getGalleryContent,
      projects: this.state.projects,
      filterQuery: this.state.filterQuery,
    }

    const aboutProps = {
      getAboutContent:this.getAboutContent,
      biography: this.state.biography,
      contact: this.state.contact,
      clientList: this.state.clientList,
      pressList: this.state.pressList,
      exhibitionList: this.state.exhibitionList,
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
          <Switch>
            <Route exact path='/about' render={(props) => (
              <About {...this.props} {...aboutProps} />
            )}/>
            <Route exact path='/' render={(props) => (
              <Home {...this.props} {...homeProps} />
            )}/>
            </Switch>
        </div>
      </Router>
    )
  }
}
