import React, { Component } from 'react'
import { createClient }  from 'contentful'
import Main from './Main'
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
    }
    this.client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_DELIVERY_ACCESS_TOKEN,
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


  render() {
    const homeProps = {
      getGalleryContent: this.getGalleryContent,
      projects: this.state.projects,
      filterQuery: this.state.filterQuery,
      handleOpenGallery: this.handleOpenGallery,
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

    return (
      <Main {...this.props} {...homeProps} {...aboutProps}/>
    )
  }
}
