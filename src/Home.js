import React, { Component } from 'react'
import { Gallery } from './Gallery'
import Header from './Header'
import lodash from 'lodash'
import classnames from 'classnames'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedGalleries: [],
      arrangeDone: false,
      minHeight: 0,
      loaded: false,
      absoluteScreenOrigin: 0,
    }
  }

  componentDidMount = () => {
    window.addEventListener("resize", lodash.throttle(this.updateDimensions, 500))
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions)
  }

  addToGalleryList = (e, index) => {
    // when an image is loaded with all its information, copy the array in state and add the new image
    const galleryObject = {
      hover:'display',
      display:'off',
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      node: e.target,
      index: index,
    }

    this.setState({
      loadedGalleries: this.state.loadedGalleries.concat(galleryObject),
      loaded: index === this.props.projects.length - 1 ? true : false,
    }, () => {
        this.onAllLoad()
    })
  }

  generatePiles = () => {
    return this.props.projects.map((project, index) => {
      // set defaults so react doesn't absolutely freak out
      let galleryInfo = {}
      // only set this gallery coords when there is something to set
      if (this.state.loaded) {
        galleryInfo = this.state.loadedGalleries[index]
      }
      return (
        <Gallery
          //gallery display state and methods
          galleryInfo={galleryInfo}
          addToGalleryList={this.addToGalleryList}
          handleOpenGallery={this.handleOpenGallery}
          handleSetHoverState={this.handleSetHoverState}
          allLoaded={this.state.loaded}
          //gallery info
          thumbURL={project.fields.assets[0].fields.file.url}
          fields={project.fields}
          // misc
          galleryIndex={index}
          key={project.sys.id}
          absoluteScreenOrigin={this.state.absoluteScreenOrigin}
        />
      )
    })
  }


  handleSetHoverState = (isHovering, index) => {
  //   let hoverStates = this.state.hoverStates
  //   let displayStates = this.state.displayStates
  //   if (lodash.indexOf(displayStates, 'on') !== -1) {
  //     hoverStates = hoverStates.map((state) => { return 'ignoreHover' })
  //     this.setState({ hoverStates: hoverStates })
  //   } else {
  //     switch (isHovering) {
  //       case 'hover':
  //         hoverStates = hoverStates.map((state) => { return 'fade' })
  //         hoverStates[index] = 'forward'
  //         this.setState({ hoverStates: hoverStates })
  //         break
  //       default:
  //         hoverStates = hoverStates.map((state) => { return 'default' })
  //         this.setState({ hoverStates: hoverStates })
  //         break
  //     }
  //   }
  }

  handleOpenGallery = (displayState, index) => {
    console.log(displayState, index)
  //   document.body.classList.add('stopScroll')
  //   let hoverStates = this.state.hoverStates
  //   let displayStates = this.state.displayStates
  //   displayStates = displayStates.map((state) => { return 'off' })
  //   displayStates[index] = 'on'
  //   hoverStates = hoverStates.map((state) => { return 'ignoreHover' })
  //   this.setState({
  //     displayStates: displayStates,
  //     hoverStates: hoverStates,
  //   })
  }
  //
  handleCloseGallery = () => {
  //   document.body.classList.remove('stopScroll')
  //   let displayStates = this.state.displayStates
  //   displayStates = displayStates.map((state) => { return 'default' })
  //   this.setState({ displayStates: displayStates})
  }

  // changeGalleryFrame = (buttonDirection, maxFrame) => {
  //   if (buttonDirection === 'left' && this.state.currentGalleryCurrentFrame > 0) {
  //     this.setState = ({currentGalleryCurrentFrame: this.state.currentGalleryCurrentFrame - 1 })
  //   } else if ((buttonDirection === 'right' && this.state.currentGalleryCurrentFrame < maxFrame)){
  //     this.setState = ({currentGalleryCurrentFrame: this.state.currentGalleryCurrentFrame + 1 })
  //   }
  // }

  onAllLoad = () => {
    const galleries = lodash.orderBy(this.state.loadedGalleries, ['index'], ['asc'])
    this.setState({
      loadedGalleries: galleries,
    }, () => this.updateDimensions())
  }

  updateDimensions = () => {
    if (this.state.loaded) {
      const viewWidth = window.innerWidth
      const viewHeight = window.innerHeight
      const windowCenter = window.innerWidth * 0.5
      const nudgeFactorY = 0.008
      let lastBottom = 0
      let deltaY = 0
      let deltaX = 0
      const updatedGalleries = this.state.loadedGalleries.map((originalGallery, index) => {
        const bounding = originalGallery.node.getBoundingClientRect()
        const thisHeight = bounding.height
        const thisWidth = bounding.width
        const nudgeFactorX = 0.08

        // do the algo
        if (index === 0) {
          lastBottom = thisHeight
          deltaX = windowCenter - (thisWidth - (viewWidth * .08))
        } else if (index <= this.state.loadedGalleries.length - 1 && index !== 0) {
          deltaY = lastBottom - (thisHeight * 0.08)
          lastBottom = thisHeight + deltaY

          if (index % 2 === 1) {
            // right
            deltaX = windowCenter - (thisWidth * nudgeFactorX)
          } else {
            // left
            deltaX = windowCenter - (thisWidth - (viewWidth * nudgeFactorX))
          }
        }

        const galleryObject = {
          hover:    originalGallery.hover,
          display:  originalGallery.display,
          width:    bounding.width,
          height:   bounding.height,
          top:      deltaY,
          left:     deltaX,
          node:     originalGallery.node,
        }
        return galleryObject
      })
      // get the absolute origin of the center of the screen regardless of scrollY
      const absoluteScreenOrigin = {
        y: window.scrollY + (window.innerHeight * 0.5),
        x: window.innerWidth * 0.5,
      }
      this.setState({
        absoluteScreenOrigin,
        loadedGalleries: updatedGalleries,
        minHeight: lastBottom,
      })
    }
  }



  render() {
    let minHeight = {
      minHeight: `${this.state.minHeight}px`,
    }

    let loadingState = classnames({
      'loadingOn': !this.state.loaded,
      'loadingOff': this.state.loaded,
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
