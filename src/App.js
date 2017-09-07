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
      diaryURL: '',
    }
    this.client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_DELIVERY_ACCESS_TOKEN,
    })
  }

  componentWillMount = () => {
    this.getAboutContent()
    this.getGalleryContent()
  }

  // GET for getting all bio page content
  getAboutContent = () => {
    if (this.state.biography === '') {
      this.client.getEntry('OfeSMd5RGmcYUq0Cy8y4Y')
      .then((entry) => {
        let portrait = entry.fields.portrait.sys.id
        this.client.getAsset(portrait).then((response) => {
          this.setState({
            portrait: response.fields.file,
          })
        })
        this.setState({
          biography: entry.fields.biographyText,
          contact: {
            email: entry.fields.email,
            phoneNumber: entry.fields.phoneNumber,
            instagram: entry.fields.instagram,
          },
          clientList: entry.fields.clientList,
          pressList: entry.fields.pressList,
          exhibitionList: entry.fields.exhibitionsList,
          diaryURL: entry.fields.diaryUrl,
        })
      })
      .catch((reason) => console.error(reason, 'Error getting bio content from contentful'))
    }
  }

  // GET for getting all gallery content
  getGalleryContent = () => {
    if (this.state.projects.length === 0) {
      this.client.getEntries({ content_type: 'project' })
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
      diaryURL: this.state.diaryURL,
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
