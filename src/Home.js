import React, { Component } from 'react'
import { Gallery } from './Gallery'
import _ from 'lodash'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensionArr: [],
      galleryListWithCoords: [],
      loadedGalleries: [],
    }
  }

  addToGalleryList = (gallery, index) => {
      let imgObject = {
        width:gallery.target.clientWidth,
        height: gallery.target.clientHeight,
        index,
        x: 0,
        y: 0,
      }
      this.setState({
        loadedGalleries: this.state.loadedGalleries.concat(gallery.target),
      }, () => {this.arrangePiles()})
    }


  generatePiles = () => {
    return this.props.projects.map((project, index) => {
      let thisGalleryCoords = {}
      // only set this gallery coords when there is something to set
      if (this.state.galleryListWithCoords.length !== 0) {
        let thisGalleryCoords = this.state.galleryListWithCoords[index]
      }
      return (
        <Gallery
          thisGalleryCoords={thisGalleryCoords}
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
    if (this.props.projects.length === this.state.loadedGalleries.length) {
      const globalOrigin = 0

      const initalMaxOverlap = 0.4
      let thisMaxOverlap = initalMaxOverlap
      const minOverlap = 0.1

      let offsetFromTop = 0
      let thisY = 0
      let lastHeight = 0
      // REMINDER: resort the dimensionArr by index
      return this.props.projects.map((project, index) => {
        // maxOverlap = (lastHeight / )
        let overlap = lastHeight * ( Math.random() * (maxOverlap - minOverlap) + minOverlap)
        let thisY = lastHeight - overlap + offsetFromTop
        offsetFromTop = thisY
        lastHeight = this.state.galleryList[index].dimensions.height
        return ({x:40, y:thisY, overlap: overlap, bottom: thisY + lastHeight})
      })
    }

  }

  render() {

    return (
      <main className={'home'}>
        <content>
          {this.generatePiles()}
        </content>
        <footer>{'Christelle De Castro'}</footer>
      </main>
    )
  }
}

export default Home
