import React, { Component } from 'react'
import { Gallery } from './Gallery'
import lodash from 'lodash'
import classnames from 'classnames'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensionArr: [],
      loadedGalleries: [],
      hoverStates: [],
      arrangeDone: false,
      minHeight: 0,
      loaded: false,
      galleryToDisplay: -1,
    }
  }

  addToGalleryList = (gallery, index) => {
    // this could be done with Element.getBoundingClientRect()
    let imgObject = {
      index,
      width:gallery.target.clientWidth,
      height: gallery.target.clientHeight,
      x: 0,
      y: 0,
    }
    // when an image is loaded with all its information, copy the array in state and add the new image
    this.setState({
      loadedGalleries: this.state.loadedGalleries.concat(imgObject),
      hoverStates: this.state.hoverStates.concat(true),
    }, () => {this.arrangePiles()})
  }

  generatePiles = () => {
    return this.props.projects.map((project, index) => {
      // get the absolute origin of the center of the screen regardless of scrollY
      let absScreenOrigin = {
        y: window.scrollY + (window.innerHeight * 0.5),
        x: window.innerWidth * 0.5,
      }
      // set defaults
      let galleryCoordinates = {}
      let hover = true
      // only set this gallery coords when there is something to set
      if (this.state.arrangeDone) {
        galleryCoordinates = this.state.loadedGalleries[index]
        hover = this.state.hoverStates[index]
      }
      return (
        <Gallery
          hover={hover}
          galleryCoordinates={galleryCoordinates}
          addToGalleryList={this.addToGalleryList}
          thumbURL={project.fields.assets[0].fields.file.url}
          fields={project.fields}
          index={index}
          open={this.props.galleryToDisplay === index ? true : false}
          openGallery={this.props.openGallery}
          setScreenState={this.setScreenState}
          key={project.sys.id}
          allLoaded={this.state.arrangeDone}
          absScreenOrigin={absScreenOrigin}
        />
      )
    })
  }

  // REMINDER make offsets in viewWidth /viewHeight
  arrangePiles = () => {
    if (this.props.projects.length === this.state.loadedGalleries.length) {
      let lastBottom = 0
      let lastRight = 0
      let viewWidth = window.innerWidth
      let windowCenter = viewWidth / 2
      let deltaY = 0
      let deltaX = 0
      // re-sort to correct project indexes because images are added to loadedGalleries first come first serve
      let galleryList = lodash.orderBy(this.state.loadedGalleries, ['index'], ['asc'])
      let arrangedGalleries = this.props.projects.map((project, index) => {
        //define vars
        const img = galleryList[index]
        const thisHeight = img.height
        const thisWidth = img.width
        // do the algo for X, Y
        if (index === 0) {
          // first one
          lastRight = img.width
          lastBottom = img.height
          deltaX = windowCenter - (img.width - (viewWidth * 0.04))
        } else if (index <= this.props.projects.length - 1 && index !== 0) {
          deltaY = lastBottom - (thisHeight * 0.08)
          lastBottom = img.height + deltaY
          if (index % 2 === 1) {
            // right
            deltaX = windowCenter - (thisWidth * 0.08)
          } else {
            // left
            deltaX = windowCenter - (thisWidth - (viewWidth * 0.04))
          }
          // REMINDER: not needed unless there is forward / backward awareness
        } else {
          // last one
          deltaY = lastBottom - (thisHeight * 0.08)
          lastBottom = img.height + deltaY

          deltaX = lastRight - (thisWidth * 0.08)
          lastRight = img.width + deltaX
        }

        // set the results
        img.y = deltaY
        img.x = deltaX
        return img
      })
      this.setState({
        minHeight: lastBottom,
        arrangeDone: true,
        loadedGalleries: arrangedGalleries,
      })
    }
  }

  setScreenState = (isHovering, index) => {
    // false equals fade, true equals show
    if (isHovering) {
      let states = this.state.hoverStates
      states = states.map((state) => {
        return false
      })
      states[index] = true
      this.setState({
        hoverStates: states,
      })
    } else {
      let states = this.state.hoverStates
      states = states.map((state) => {
        return true
      })
      this.setState({
        hoverStates: states,
      })
    }
  }

  render() {
    let minHeight = {
      minHeight: `${this.state.minHeight}px`,
    }

    let loadingState = classnames({
      'loadingOn': !this.state.arrangeDone,
      'loadingOff': this.state.arrangeDone,
    })
    let overlayState = classnames({
      'overlayOn': this.props.galleryToDisplay !== -1,
      'overlayOff': this.props.galleryToDisplay === -1,
    })
    return (
      <main className={'home'}>
      <div id={'loadingScreen'} className={loadingState} />
      <div id={'overlay'} className={overlayState} />
        <content style={minHeight}>
        <div className={'centerline'} />
        <div className={'centerline2'} />
          {this.generatePiles()}
        </content>
        <footer>{'Christelle De Castro'}</footer>
      </main>
    )
  }
}

export default Home
