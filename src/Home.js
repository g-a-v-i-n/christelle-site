import React, { Component } from 'react'
import { Gallery } from './Gallery'
import Header from './Header'
import lodash from 'lodash'
import classnames from 'classnames'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensionArr: [],
      loadedGalleries: [],
      hoverStates: [],
      displayStates: [],
      arrangeDone: false,
      minHeight: 0,
      loaded: false,
      currentGalleryCurrentFrame: 0,
      currentGalleryMaxFrame: 0,
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
      hoverStates: this.state.hoverStates.concat(''),
      displayStates: this.state.displayStates.concat(''),
    }, () => {this.arrangePiles()})
  }

  generatePiles = () => {
    return this.props.projects.map((project, index) => {
      // get the absolute origin of the center of the screen regardless of scrollY
      const absoluteScreenOrigin = {
        y: window.scrollY + (window.innerHeight * 0.5),
        x: window.innerWidth * 0.5,
      }
      // set defaults so react doesn't absolutely freak out
      let galleryCoordinates = {}
      let hover = 'ignore'
      let display = 'default'
      // only set this gallery coords when there is something to set
      if (this.state.arrangeDone) {
        galleryCoordinates = this.state.loadedGalleries[index]
        hover = this.state.hoverStates[index]
        display = this.state.displayStates[index]
      }
      return (
        <Gallery
          //gallery display state and methods
          hover={hover}
          display={display}
          openGallery={this.props.handleOpenGallery}
          handleGalleryDisplay={this.handleGalleryDisplay}
          handleSetHoverState={this.handleSetHoverState}
          allLoaded={this.state.arrangeDone}
          //gallery info
          thumbURL={project.fields.assets[0].fields.file.url}
          fields={project.fields}
          // gallery positionioning
          addToGalleryList={this.addToGalleryList}
          galleryCoordinates={galleryCoordinates}
          absScreenOrigin={absoluteScreenOrigin}
          currentGalleryCurrentFrame={this.state.currentGalleryCurrentFrame}
          // misc
          index={index}
          key={project.sys.id}
        />
      )
    })
  }

  // REMINDER make offsets in viewWidth /viewHeight
  arrangePiles = () => {
    if (this.props.projects.length === this.state.loadedGalleries.length) {
      let lastBottom = 0
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
        // do the algo
        if (index === 0) {
          lastBottom = thisHeight
          deltaX = windowCenter - (thisWidth - (viewWidth * 0.04))
        } else if (index <= this.props.projects.length - 1 && index !== 0) {
          deltaY = lastBottom - (thisHeight * 0.08)
          lastBottom = thisHeight + deltaY
          if (index % 2 === 1) {
            // right
            deltaX = windowCenter - (thisWidth * 0.08)
          } else {
            // left
            deltaX = windowCenter - (thisWidth - (viewWidth * 0.04))
          }
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

  handleSetHoverState = (isHovering, index) => {
    let hoverStates = this.state.hoverStates
    let displayStates = this.state.displayStates
    if (lodash.indexOf(displayStates, 'on') !== -1) {
      hoverStates = hoverStates.map((state) => { return 'ignoreHover' })
      this.setState({ hoverStates: hoverStates })
    } else {
      switch (isHovering) {
        case 'hover':
          hoverStates = hoverStates.map((state) => { return 'fade' })
          hoverStates[index] = 'forward'
          this.setState({ hoverStates: hoverStates })
          break
        default:
          hoverStates = hoverStates.map((state) => { return 'default' })
          this.setState({ hoverStates: hoverStates })
          break
      }
    }
  }

  handleGalleryDisplay = (displayState, index) => {
    document.body.classList.add('stopScroll')
    let hoverStates = this.state.hoverStates
    let displayStates = this.state.displayStates
    displayStates = displayStates.map((state) => { return 'off' })
    displayStates[index] = 'on'
    hoverStates = hoverStates.map((state) => { return 'ignoreHover' })
    this.setState({
      displayStates: displayStates,
      hoverStates: hoverStates,
    })
  }

  handleCloseGallery = () => {
    document.body.classList.remove('stopScroll')
    let displayStates = this.state.displayStates
    displayStates = displayStates.map((state) => { return 'default' })
    this.setState({ displayStates: displayStates})
  }

  changeGalleryFrame = (buttonDirection, maxFrame) => {
    if (buttonDirection === 'left' && this.state.currentGalleryCurrentFrame > 0) {
      this.setState = ({currentGalleryCurrentFrame: this.state.currentGalleryCurrentFrame - 1 })
    } else if ((buttonDirection === 'right' && this.state.currentGalleryCurrentFrame < maxFrame)){
      this.setState = ({currentGalleryCurrentFrame: this.state.currentGalleryCurrentFrame + 1 })
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
      <Header {...this.props} handleCloseGallery={this.handleCloseGallery}/>
      <div id={'loadingScreen'} className={loadingState} />
      <div id={'galleryControls'}>
        <div className={'arrowContainer leftArrowContainer'}><div className={'arrow'} /></div>
        <div className={'arrowContainer rightArrowContainer'}><div className={'arrow'} /></div>
        <div id={'galleryInfo'}>{'info'}</div>
      </div>
        <content style={minHeight}>
        <div id={'overlay'} className={overlayState} onClick={() => this.handleCloseGallery()}/>
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
