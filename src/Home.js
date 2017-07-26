import React, { Component } from 'react'
import { Gallery } from './Gallery'
import _ from 'lodash'

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
    const maxOverlap = 0.4
    const minOverlap = 0.1
    // let lastPosX = 0
    let offsetFromTop = 0
    let thisY = 0
    let lastHeight = 0
    // REMINDER: resort the dimensionArr by index
    return this.props.projects.map((project, index) => {
      // maxOverlap = (lastHeight / )
      let overlap = lastHeight * ( Math.random() * (maxOverlap - minOverlap) + minOverlap)
      let thisY = lastHeight - overlap + offsetFromTop
      offsetFromTop = thisY
      lastHeight = this.galleryList[index].dimensions.height
      return ({x:40, y:thisY, overlap: overlap, bottom: thisY + lastHeight})
    })
  }

  render() {
    let height = {}
    if (this.state.homeCoordinates.length === this.props.projects.length && this.state.homeCoordinates.length !== 0) {
      let lastItem = _.takeRight(this.state.homeCoordinates)
      const containerHeight = lastItem[0].bottom
      height = {
        height: `${Math.ceil(containerHeight)}px`,
      }
    }

    return (
      <main className={'home'}>
        <content style={height}>
          {this.generatePiles()}
        </content>
        <footer>{'Christelle De Castro'}</footer>
      </main>
    )
  }
}

export default Home
