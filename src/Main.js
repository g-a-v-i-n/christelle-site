import React, { Component } from 'react'
import { Gallery } from './Gallery'
import { MainHeader } from './Header'
import About from './About'
import { LeftGalleryArrow, RightGalleryArrow } from './svgs'
import lodash from 'lodash'
import classnames from 'classnames'
import update from 'immutability-helper'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedGalleries: [],
      arrangeDone: false,
      minHeight: 0,
      loaded: false,
      releaseLoadingScreen: false,
      absoluteScreenOrigin: 0,
      galleryOn: false,
      filterQuery: 'Index',
      filters: ['Photo', 'Video'],
      filterMenuOpen: false,
      aboutOpen: false,
      currentGalleryIndex: 0,
      totalFrames: 0,
      loadedImages: [],
      allImagesLoaded: false,
      galleryVisibility: false,
      galleryScrollIndex: 0,
      currentFocusedIndex: 0,
      scrollLatch: false,
    }
  }

  componentDidMount = () => {
    window.addEventListener("resize", lodash.throttle(this.handleOnResize, 250))
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleOnResize)
  }

  addToPhotoList = (e, index, galleryIndex) => {
    const totalAssets = this.props.projects[galleryIndex].fields.assets.length
    const originalLoadedImages = this.state.loadedImages
    const imageObject = {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      node: e.target,
      imageIndex: index,
    }
    this.setState({
      loadedImages: this.state.loadedImages.concat(imageObject),
      // recall that we skip the thumbnail and want to call this AT the last image load
      allImagesLoaded: originalLoadedImages.length + 1  === totalAssets - 1 ? true : false,
    }, () => {
        this.onAllImagesLoaded()
    })
  }

  onAllImagesLoaded = () => {
    if (this.state.allImagesLoaded) {
      const images = lodash.sortBy(this.state.loadedImages, ['imageIndex'], ['asc'])
      this.setState({
        loadedImages: images,
      }, () => this.placeGalleryImages())
    }
  }

  addToGalleryList = (e, index) => {
    const galleryObject = {
      //hover: normal, fade, ignore
      hover:'normal',

      // display: feed, off, gallery
      display: 'feed',
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      node: e.target,
      galleryIndex: index,
    }
    this.setState({
      loadedGalleries: this.state.loadedGalleries.concat(galleryObject),
      loaded: this.state.loadedGalleries.length === this.props.projects.length - 1 ? true : false,
    }, () => {
        // ensure galleries are correctly ordered and update gallery positions once
        this.onAllLoad()
    })
  }

  placeGalleryImages = () => {
    if (this.state.allImagesLoaded) {
      const updatedImages = this.state.loadedImages.map((originalImage, index) => {
        const bounding = originalImage.node.getBoundingClientRect()
        const thisWidth = bounding.width
        const deltaY = 0
        const deltaX = (index * window.innerWidth) + (thisWidth * 0.5) + (window.innerWidth *.5)
        return update(originalImage, {$merge: {
          width:    bounding.width,
          height:   bounding.height,
          top:      deltaY,
          left:     deltaX,
        }})
      })
      // console.log(updatedImages)
      this.setState({
        loadedImages: updatedImages,
        galleryVisibility: true,
      })
    }
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
          // asset management
          allImagesLoaded={this.state.allImagesLoaded}
          loadedImages={this.state.loadedImages}
          addToPhotoList={this.addToPhotoList}
          currentGalleryIndex={this.state.currentGalleryIndex}
          galleryVisibility={this.state.galleryVisibility}
          setCurrentGalleryScrollIndex={this.setCurrentGalleryScrollIndex}
          // misc
          galleryIndex={index}
          key={project.sys.id}
          absoluteScreenOrigin={this.state.absoluteScreenOrigin}
        />
      )
    })
  }

  setCurrentGalleryScrollIndex = (index) => {
    if (this.state.scrollLatch) {
      this.setState({ galleryScrollIndex: index})
    }
  }


  handleSetHoverState = (galleryIndex, isHovering) => {
    let galleries = this.state.loadedGalleries
    let updatedGalleries = []
    let currentFocusedIndex = this.state.galleryScrollIndex
    // if a gallery is displayed, ignore hover
    if (this.state.galleryOn) {
      updatedGalleries = galleries.map((originalGallery) => {
        return update(originalGallery, {$merge: {hover: 'noHover'}})
      })
    // if no gallery is displayed
    } else {
      if (isHovering === true) {
        updatedGalleries = galleries.map((originalGallery, index) => {
          if (index === galleryIndex) {
            currentFocusedIndex = index
            return update(originalGallery, {$merge: {hover: 'forward'}})
          } else {
            return update(originalGallery, {$merge: {hover: 'fade'}})
          }
        })
      } else {
        updatedGalleries = galleries.map((originalGallery, index) => {
          return this.state.galleryScrollIndex === index ?
            update(originalGallery, {$merge: {hover: 'forward'}}) :
            update(originalGallery, {$merge: {hover: 'fade'}})
        })
      }
      this.setState({
        loadedGalleries: updatedGalleries,
        currentFocusedIndex,
        scrollLatch: true,
      })
    }
  }

  handleOpenGallery = (displayState, galleryIndex) => {
    document.body.classList.add('stopScroll')
    let galleries = this.state.loadedGalleries
    let updatedGalleries = galleries.map((originalGallery, index) => {
      if (index === galleryIndex) {
        return update(originalGallery, {$merge: {display: 'gallery', hover: 'noHover'}})
      } else {
        return update(originalGallery, {$merge: {display: 'off', hover: 'noHover'}})
      }
    })
    this.setState({
      loadedGalleries: updatedGalleries,
      galleryOn: true,
      filterMenuOpen: false,
      totalFrames: this.props.projects[galleryIndex].fields.assets.length,
    })
  }


  handleCloseGallery = () => {
    document.body.classList.remove('stopScroll')
    let galleries = this.state.loadedGalleries
    let updatedGalleries = galleries.map((originalGallery, index) => {
      return update(originalGallery, {$merge: {display: 'feed', hover: 'normal'}})
    })
    this.setState({
      loadedImages: [],
      allImagesLoaded: false,
      loadedGalleries: updatedGalleries,
      galleryOn: false,
      totalFrames: 0,
      currentGalleryIndex: 0,
      galleryVisibility: false,
    })
  }

  onAllLoad = () => {
    if (this.state.loaded) {
      const galleries = lodash.sortBy(this.state.loadedGalleries, ['galleryIndex'], ['asc'])
      this.setState({
        loadedGalleries: galleries,
      }, () => this.updateDimensions())
    }
    setTimeout(() => { this.setState({ releaseLoadingScreen: true }) }, 650)
  }

  handleOnResize = () => {
    // only move images when resize has finished
    clearTimeout(window.resizedFinished)
    window.resizedFinished = setTimeout(() => {
        this.updateDimensions()
    }, 400)
  }


  updateDimensions = () => {
    if (this.state.loaded) {
      const viewWidth = window.innerWidth
      const viewHeight = window.innerHeight
      const unitRatio = viewWidth / 10000
      const strutLeft = -(viewWidth * (unitRatio))
      const strutRight = (viewWidth * (unitRatio))
      const frameHeight = viewHeight - 200
      let deltaY = 0
      let deltaX = 0
      let position = 0
      let imageBottom = 0
      let marginHeight = 0
      const updatedGalleries = this.state.loadedGalleries.map((originalGallery, index) => {
        const bounding = originalGallery.node.getBoundingClientRect()
        const thisHeight = bounding.height
        // do the algo
        if (index === 0) {
          deltaY = 0 - ((frameHeight - thisHeight)/2)
          marginHeight = frameHeight - thisHeight/2
          imageBottom = thisHeight + marginHeight + deltaY - (thisHeight * 0.04)
          deltaX = strutLeft
        } else if (index + 1 <= this.state.loadedGalleries.length && index !== 0) {
          marginHeight = frameHeight - thisHeight/2
          deltaY = imageBottom - marginHeight - (thisHeight * 0.04)
          position = imageBottom = thisHeight + marginHeight + deltaY
          if (index % 2 === 1) {
            deltaX = strutRight
          } else {
            deltaX = strutLeft
          }
        }
        return update(originalGallery, {$merge: {
          width:    bounding.width,
          height:   bounding.height,
          top:      deltaY,
          left:     deltaX,
        }})
      })
      this.setState({
        loadedGalleries: updatedGalleries,
        minHeight: position - 200,
      })
    }
  }

  setFilterQuery = (e, filterQuery) => {
    e.preventDefault()
    e.stopPropagation()
    let initialFilters = this.state.filters
    let newFilters = update(initialFilters, {$unset: filterQuery, $push:this.state.filterQuery})
    console.log(newFilters)
  }

  toggleFilterMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ filterMenuOpen: !this.state.filterMenuOpen })
  }

  toggleAbout = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.state.aboutOpen) {
      document.body.classList.remove('stopScroll')
    } else {
      document.body.classList.add('stopScroll')
    }
    this.setState({
      aboutOpen: !this.state.aboutOpen,
      filterMenuOpen: false,
     })
  }

  handleAdvanceGallery = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.state.currentGalleryIndex < this.state.totalFrames - 1) {
      this.setState({
        currentGalleryIndex: this.state.currentGalleryIndex + 1,
      })
    }
  }

  handleRetreatGallery = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.state.currentGalleryIndex !== 0) {
      this.setState({
        currentGalleryIndex: this.state.currentGalleryIndex - 1,
      })
    }
  }

  render() {
    const headerProps = {
      setFilterQuery:this.setFilterQuery,
      filterMenuOpen:this.state.filterMenuOpen,
      filterQuery: this.state.filterQuery,
      filters: this.state.filters,
      toggleFilterMenu: this.toggleFilterMenu,
      handleCloseGallery: this.handleCloseGallery,
      toggleAbout: this.toggleAbout,
      galleryOn: this.state.galleryOn,
    }

    let minHeight = {
      minHeight: `${this.state.minHeight}px`,
    }

    let showControls = classnames({
      'showControls': this.state.galleryOn,
      'hideControls': !this.state.galleryOn,
    })

    let loadingState = classnames({
      'loadingOn': !this.state.releaseLoadingScreen,
      'loadingOff': this.state.releaseLoadingScreen,
    })

    let overlayState = classnames({
      'overlayOn': this.state.galleryOn,
      'overlayOff': !this.state.galleryOn,
    })


    let projectName = ''
    let projectClient = ''
    if (this.props.projects.length !== 0) {
      projectName = this.props.projects[this.state.currentFocusedIndex].fields.projectName
      projectClient = this.props.projects[this.state.currentFocusedIndex].fields.client
    }

    return (
      <main className={'home'}>
      <About {...this.props} aboutOpen={this.state.aboutOpen} {...headerProps}/>
      <MainHeader {...this.props} {...headerProps} />
      <div id={'loadingScreen'} className={loadingState} />
      <div id={'galleryControls'} className={showControls}>
        <div className={'arrowContainer leftArrowContainer'} onClick={(e) => this.handleRetreatGallery(e)}>
          <LeftGalleryArrow active={this.state.currentGalleryIndex !== 0 ? true : false}/>
        </div>
        <div className={'arrowContainer rightArrowContainer'} onClick={(e) => this.handleAdvanceGallery(e)}>
          <RightGalleryArrow active={this.state.currentGalleryIndex < this.state.totalFrames - 1 ? true : false}/>
        </div>
      </div>
      <div id={'galleryInfo'}>
        <div className={'imageName'}>{projectName}</div>
        <div className={'gallery-clientContainer'}>
          <div className={'midDash'}/>
          <div className={'imageClient'}>{projectClient}</div>
        </div>
      </div>
        <content style={minHeight}>
        <div id={'overlay'} className={overlayState} onClick={() => this.handleCloseGallery()}/>
        <div className={'centerline'} />
        <div className={'centerline2'} />
          {this.generatePiles()}
        </content>
      </main>
    )
  }
}

export default Home
