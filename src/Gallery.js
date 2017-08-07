import React, { Component } from 'react'
import { MainAsset, Asset } from './Asset'
import lodash from 'lodash'
import classnames from 'classnames'
import update from 'immutability-helper'

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedImages: [],
      loaded: false,
    }
  }

  addToPhotoList = (e, index) => {
    // when an image is loaded with all its information, copy the array in state and add the new image
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
      loaded: this.state.loadedImages.length === this.props.fields.assets.length -2 ? true : false,
    }, () => {
        this.onAllLoad()
    })
  }

  generateAssets = () => {
    const imageObjects = lodash.tail(this.props.fields.assets)
    let imageInfo = {}
    return imageObjects.map((image, index) => {
      if (this.state.loaded) {
        imageInfo = this.state.loadedImages[index]
      }
      return (
        <Asset
          allImagesLoaded = {this.state.loaded}
          index={index + 1}
          imageInfo={imageInfo}
          imageURL={image.fields.file.url}
          handleOnLoad={this.addToPhotoList}/>
      )
    })
  }

  onAllLoad = () => {
    if (this.state.loaded) {
      const images = lodash.sortBy(this.state.loadedImages, ['imageIndex'], ['asc'])
      this.setState({
        loadedImages: images,
      }, () => this.updateDimensions())
    }
  }

  updateDimensions = () => {
    if (this.state.loaded) {
      const updatedImages = this.state.loadedImages.map((originalImage, index) => {
        const bounding = originalImage.node.getBoundingClientRect()
        const thisHeight = bounding.height
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
      })
    }
  }


  render() {
    let conditionalClasses = {}
    let translations = {}
    const hover = this.props.galleryInfo.hover
    const display = this.props.galleryInfo.display

    if (this.props.allLoaded) {
      const width = this.props.galleryInfo.width
      const height = this.props.galleryInfo.height
      const top = this.props.galleryInfo.top
      const left =this.props.galleryInfo.left
      const node = this.props.galleryInfo.node
      const galleryIndex = this.props.galleryInfo.index
      const absoluteScreenOrigin = {
        y: window.scrollY + (window.innerHeight * 0.5),
        x: window.innerWidth * 0.5,
      }
      const headerOffset = 100
      const dX = absoluteScreenOrigin.x - (width * 0.5)
      const dY = absoluteScreenOrigin.y - headerOffset - (height * 0.5)
      const calcTransform = -this.props.currentGalleryIndex * window.innerWidth + dX

      // calculate element x/y transform
        // console.log(top)
        translations = { transform: `translate3d(${left}px,${top}px,0px)` }
        if (display === 'gallery') {
          translations = { transform: `translate3d(${calcTransform}px,${dY}px,0px)` }
        }
      // set hover and display classes
      conditionalClasses = classnames({
        //open and closed states
        'gallery_display-gallery': display === 'gallery',
        'gallery_display-feed': display === 'feed',
        'gallery_display-off': display === 'off',

        // hover states
        'gallery_hover-forward': hover === 'forward',
        'gallery_hover-fade': hover === 'fade',
        'gallery_hover-normal': hover === 'normal',
        'gallery_hover-noHover': hover === 'noHover',
      })
      }



    let slidingTrayTransform = {}
    if (display === 'gallery') {
      const calcTransform = -this.props.currentGalleryIndex * window.innerWidth
      slidingTrayTransform = {
        transform: `translate3d(${calcTransform}px,0px,0px)`,
      }
    }

    return (
      <div
        id={'gallery'}
        className={conditionalClasses}
        style={translations}
        onClick={() => this.props.handleOpenGallery('on', this.props.galleryIndex)}>
            <MainAsset
              addToGalleryList={this.props.addToGalleryList}
              galleryIndex={this.props.galleryIndex}
              assetIndex={0}
              onImgLoad={this.props.onImgLoad}
              thumbURL={this.props.thumbURL}
              handleSetHoverState={this.props.handleSetHoverState}
            />
            {this.generateAssets()}
      </div>
    )
  }
}


export {
  Gallery,
}
