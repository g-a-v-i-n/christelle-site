import React, { Component } from 'react'
import { Gallery } from './Gallery'
import { MainHeader } from './Header'
import GalleryControls from './GalleryControls'
import About from './About'

import lodash from 'lodash'
import classnames from 'classnames'
import update from 'immutability-helper'
import Swipe from 'react-easy-swipe'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedGalleries: [],
      isHovering: false,
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
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      totalLoadableAssets: [],
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
    this.setState((prevState) => {
      return {
        loadedImages: prevState.loadedImages.concat(imageObject),
        allImagesLoaded: originalLoadedImages.length + 1  === totalAssets - 1 ? true : false,
      }
    }, () => {
        this.onAllImagesLoaded()
    })
  }

  onAllImagesLoaded = () => {
    if (this.state.allImagesLoaded) {
      const images = lodash.sortBy(this.state.loadedImages, ['imageIndex'], ['asc'])
      this.setState({
        loadedImages: images,
      }, () => {this.placeGalleryImages() })
    }
  }

  addToGalleryList = (e, index) => {
    const galleryObject = {
      //hover: normal, fade, ignore
      hover:'gallery_hover-normal',
      // display: feed, off, gallery
      display: 'gallery_display-feed',
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      node: e.target,
      galleryIndex: index,
      fields: this.props.projects[index].fields,
      sys: this.props.projects[index].sys,
    }
    this.setState((prevState) => {
      return {
        loadedGalleries: prevState.loadedGalleries.concat(galleryObject),
        loaded: this.state.loadedGalleries.length === this.props.projects.length - 1 ? true : false,
      }
    }, () => {
        this.onAllGalleryLoad()
    })
  }

  placeGalleryImages = () => {
    if (this.state.allImagesLoaded) {
      this.setState({
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
      const galleryProps = {
        //gallery display state and methods
        galleryInfo: galleryInfo,
        addToGalleryList: this.addToGalleryList,
        handleOpenGallery: this.handleOpenGallery,
        handleSetHoverState: this.handleSetHoverState,
        allLoaded: this.state.loaded,
        //gallery info
        thumbURL: project.fields.assets[0].fields.file.url,
        fields: project.fields,
        // asset management
        allImagesLoaded: this.state.allImagesLoaded,
        loadedImages: this.state.loadedImages,
        addToPhotoList: this.addToPhotoList,
        currentGalleryIndex: this.state.currentGalleryIndex,
        galleryVisibility: this.state.galleryVisibility,
        setCurrentGalleryScrollIndex: this.setCurrentGalleryScrollIndex,
        // misc
        galleryIndex: index,
        key: project.sys.id,
        absoluteScreenOrigin: this.state.absoluteScreenOrigin,
      }
      return <Gallery {...galleryProps}/>
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
        return update(originalGallery, {$merge: {hover: 'gallery_hover-noHover'}})
      })
    // if no gallery is displayed
    } else {
      if (isHovering === true) {
        updatedGalleries = galleries.map((originalGallery, index) => {
          if (index === galleryIndex) {
            currentFocusedIndex = index
            return update(originalGallery, {$merge: {hover: 'gallery_hover-forward'}})
          } else {
            return update(originalGallery, {$merge: {hover: 'gallery_hover-fade'}})
          }
        })
      } else {
        updatedGalleries = galleries.map((originalGallery, index) => {
          return this.state.galleryScrollIndex === index ?
            update(originalGallery, {$merge: {hover: 'gallery_hover-forward'}}) :
            update(originalGallery, {$merge: {hover: 'gallery_hover-normal'}})
        })
      }
      this.setState({
        loadedGalleries: updatedGalleries,
        currentFocusedIndex,
        scrollLatch: true,
        isHovering,
      })
    }
  }

  handleOpenGallery = (displayState, galleryIndex) => {
    document.body.classList.add('stopScroll')
    let galleries = this.state.loadedGalleries
    let updatedGalleries = galleries.map((originalGallery, index) => {
      if (index === galleryIndex) {
        return update(originalGallery, {$merge: {display: 'gallery_display-gallery', hover: 'gallery_hover-noHover'}})
      } else {
        return update(originalGallery, {$merge: {display: 'gallery_display-off', hover: 'gallery_hover-noHover'}})
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
    let updatedGalleries = this.state.loadedGalleries.map((originalGallery, index) => {
      return update(originalGallery, {$merge: {display: 'gallery_display-feed', hover: 'gallery_hover-normal'}})
    })
    if (this.state.currentGalleryIndex !== 0) {
      this.setState({
        galleryVisibility: false,
        galleryOn: false,
      })
      // delay resetting counter for elegant transition
      setTimeout(() => {
        this.setState({
          loadedGalleries: updatedGalleries,
          allImagesLoaded: false,
          loadedImages: [],
          totalFrames: 0,
          currentGalleryIndex: 0,
        })
      }, 300)
    } else {
      this.setState({
        galleryVisibility: false,
        galleryOn: false,
        loadedGalleries: updatedGalleries,
        allImagesLoaded: false,
        loadedImages: [],
        totalFrames: 0,
        currentGalleryIndex: 0,
      })
    }

  }

  onAllGalleryLoad = () => {
    if (this.state.loaded) {
      const galleries = lodash.sortBy(this.state.loadedGalleries, ['galleryIndex'], ['asc'])
      this.setState({
        loadedGalleries: galleries,
      }, () => this.updateDimensions('Index'))
      setTimeout(() => { this.setState({ releaseLoadingScreen: true }) }, 650)
    }
  }

  handleOnResize = () => {
    clearTimeout(window.resizedFinished)
    window.resizedFinished = setTimeout(() => {
      if (Math.abs(this.state.windowHeight - window.innerHeight) > 100 || this.state.windowWidth !== window.innerWidth) {
        this.setState({windowHeight: window.innerHeight, windowWidth: window.innerWidth})
        this.updateDimensions(this.state.filterQuery)
      }
    }, 400)
  }

  updateDimensions = (filterQuery) => {
    if (this.state.loaded) {
      const viewWidth = window.innerWidth
      const viewHeight = window.innerHeight
      const unitRatio = viewWidth / 10000
      // define struts with max offset based on screen width
      const strutLeft = viewWidth > 1650 ? -(1650 * (1650 / 10000)) : -(viewWidth * (unitRatio))
      const strutRight = viewWidth > 1650 ? (1650 * (1650 / 10000)) : (viewWidth * (unitRatio))
      const frameHeight = viewHeight - 200
      let minHeight = 0
      let deltaY = 0
      let deltaX = 0
      let position = 0
      let imageBottom = 0
      let marginHeight = 0
      let marginWidth = 0
      let filterIndex = 0
      const updatedGalleries = this.state.loadedGalleries.map((originalGallery, index) => {
        const bounding = originalGallery.node.getBoundingClientRect()
        const thisHeight = bounding.height
        const thisWidth = bounding.width
        marginHeight = (frameHeight - thisHeight)/2
        marginWidth = (viewWidth - thisWidth)/2
        //handle Y
        if (filterQuery !== 'Index' && originalGallery.fields.projectType !== filterQuery) {
          deltaY = index === 0 ? 0 - marginHeight : imageBottom - marginHeight - (thisHeight * 0.04)
        } else {
          deltaY = filterIndex === 0 ? 0 - marginHeight : imageBottom - marginHeight - (thisHeight * 0.04)
        }
        position = imageBottom = thisHeight + marginHeight + deltaY
        //handle X
        if (filterQuery !== 'Index' && originalGallery.fields.projectType !== filterQuery) {
          deltaX = index % 2 === 0 ? -viewWidth + marginWidth - 100 : viewWidth - marginWidth + 100
        } else {
          deltaX = filterIndex % 2 === 0 ? strutLeft : strutRight
        }
        filterQuery !== 'Index' && originalGallery.fields.projectType !== filterQuery ? null : filterIndex++
        return update(originalGallery, {$merge: {
          width:    bounding.width,
          height:   bounding.height,
          top:      deltaY,
          left:     deltaX,
        }})
      })
      minHeight = position > viewHeight ? position + 200 : viewHeight
      this.setState({
        loadedGalleries: updatedGalleries,
        minHeight: minHeight,
      })
    }
  }

  setFilterQuery = (e, filterQuery) => {
    const currentFilter = this.state.filterQuery
    const currentUnsetFilters = this.state.filters
    let newFilters = currentUnsetFilters.filter((filter) => {
      return filter !== filterQuery
    })
    newFilters.push(currentFilter)
    this.setState({
      filters: newFilters,
      filterQuery: filterQuery,
      filterMenuOpen: false,
    }, this.updateDimensions(filterQuery))
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
    if (this.state.currentGalleryIndex < this.state.totalFrames - 1) {
      this.setState({
        currentGalleryIndex: this.state.currentGalleryIndex + 1,
      })
    }
  }

  handleRetreatGallery = (e) => {
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
    let infoBoxState = classnames({
      'overlayOn': this.state.isHovering,
      'overlayOff': !this.state.isHovering,
    })

    let projectName = ''
    let projectClient = ''
    if (this.props.projects.length !== 0) {
      if (!this.state.galleryOn) {
        projectName = this.props.projects[this.state.currentFocusedIndex].fields.projectName
        projectClient = this.props.projects[this.state.currentFocusedIndex].fields.client
      } else {
        projectName = this.props.projects[this.state.currentFocusedIndex].fields.assets[this.state.currentGalleryIndex].fields.title
        projectClient = this.props.projects[this.state.currentFocusedIndex].fields.client
      }
    }

    return (
      <main className={'home'}>
      <About {...this.props} aboutOpen={this.state.aboutOpen} {...headerProps}/>
      <MainHeader {...this.props} {...headerProps} />
      <div id={'loadingScreen'} className={loadingState} />
      <GalleryControls
        currentGalleryIndex={this.state.currentGalleryIndex}
        totalFrames={this.state.totalFrames}
        handleAdvanceGallery={this.handleAdvanceGallery}
        handleRetreatGallery={this.handleRetreatGallery}
        galleryOn={this.state.galleryOn}/>
      <div id={'galleryIndex'} className={showControls}>
        <div>{this.state.currentGalleryIndex > 9 ? `${this.state.currentGalleryIndex + 1}` : `0${this.state.currentGalleryIndex + 1}`}</div>
        <div>{this.state.totalFrames > 9 ? `${this.state.totalFrames}` : `0${this.state.totalFrames}`}</div>
      </div>
      <div id={'galleryInfo'} className={infoBoxState}>
        <div className={'imageName'}>{projectName}</div>
        <div className={'gallery-clientContainer'}>
          <div className={'midDash'}/>
          <div className={'imageClient'}>{projectClient}</div>
        </div>
      </div>
        <Swipe onSwipeRight={(e) => this.handleRetreatGallery(e)} onSwipeLeft={(e) => this.handleAdvanceGallery(e)}>
          <content style={minHeight}>
          <div id={'overlay'} className={overlayState} onClick={() => this.handleCloseGallery()}/>
            {this.generatePiles()}
          </content>
        </Swipe>
      </main>
    )
  }
}

export default Home
