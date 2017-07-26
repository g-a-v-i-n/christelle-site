import React, { Component } from 'react'
import { Gallery } from './Gallery'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensionArr: [],
      allLoaded: false,
      homeCoordinates: [],
    }
    this.galleryList = []
  }

  componentWillMount = () => {
    this.props.getGalleryContent()
  }

  addToGalleryList = (gallery) => {
    this.galleryList = this.galleryList.concat(gallery)
    if (this.galleryList.length === this.props.projects.length) {
      const homeCoordinates = this.arrangePiles()
      this.setState({
        homeCoordinates,
      })
    }
  }

  generatePiles = () => {
    return this.props.projects.map((project, index) => {
      let homeCoordinates = null
      if (this.state.homeCoordinates.length === this.props.projects.length) {
        homeCoordinates = this.state.homeCoordinates[index]
      }
      return (
        <Gallery
          homeCoordinates={homeCoordinates}
          addToGalleryList={this.addToGalleryList}
          thumbURL={project.fields.assets[0].fields.file.url}
          fields={project.fields}
          index={index}
          key={project.sys.id}
        />
      )
    })
  }
  // REMINDER make offsets in viewWidth /viewHeight
  arrangePiles = () => {
    let lastPosX = 0
    let lastPosY = 0
    let lastHeight = this.galleryList[0].dimensions.height
    // REMINDER: resort the dimensionArr by index
    return this.props.projects.map((project, index) => {
      lastHeight = this.galleryList[index].dimensions.height
      const newY = lastPosY + (lastHeight / ((Math.random() * 2) + 1.1)) // randomize gos here
      lastPosY = newY


      return ({x:40, y:newY})
    })
  }

  render() {
    return (
      <main className={'home'}>
        <content>
          {this.generatePiles()}
        </content>
      </main>
    )
  }
}

export default Home
