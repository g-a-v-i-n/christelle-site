import React, { Component } from 'react'
import { MainAsset, Asset, VideoAsset, VideoMainAsset, BlankAsset } from './Asset'
import VisibilitySensor from 'react-visibility-sensor'
import lodash from 'lodash'
import classnames from 'classnames'

class Gallery extends Component {
  generateAssets = () => {
    const imageObjects = lodash.tail(this.props.fields.assets)
    let imageInfo = {}
    return imageObjects.map((asset, index) => {
      if (this.props.allImagesLoaded) { imageInfo = this.props.loadedImages[index] }
      const imageRegex = /\b(images.contentful.com)\b/.test(asset.fields.file.url)
      const videoRegex = /\b(videos.contentful.com)\b/.test(asset.fields.file.url)
      if (imageRegex) {
        return (
          <Asset
            index={index + 1}
            allImagesLoaded = {this.props.allImagesLoaded}
            imageInfo={imageInfo}
            galleryIndex={this.props.galleryIndex}
            imageURL={asset.fields.file.url}
            handleOnLoad={this.props.addToPhotoList}
            visibility={this.props.galleryVisibility}/>
        )
      } else if (videoRegex) {
        return (
          <VideoAsset
            index={index + 1}
            allImagesLoaded = {this.props.allImagesLoaded}
            imageInfo={imageInfo}
            galleryIndex={this.props.galleryIndex}
            imageURL={asset.fields.file.url}
            handleOnLoad={this.props.addToPhotoList}
            visibility={this.props.galleryVisibility}/>
        )
      } else {
        return (
          <BlankAsset
            index={index + 1}
            allImagesLoaded = {this.props.allImagesLoaded}
            imageInfo={imageInfo}
            galleryIndex={this.props.galleryIndex}
            imageURL={asset.fields.file.url}
            handleOnLoad={this.props.addToPhotoList}
            visibility={this.props.galleryVisibility}/>
        )
      }
    })
  }

  render() {
    let conditionalClasses = {}
    let translations = {}
    const hover = this.props.galleryInfo.hover
    const display = this.props.galleryInfo.display
    if (this.props.allLoaded) {
      const top = this.props.galleryInfo.top
      const left =this.props.galleryInfo.left
      const calcTransformX = -this.props.currentGalleryIndex * window.innerWidth
      // calculate element x/y transform
        translations = { transform: `translate3d(${left}px,${top}px,0px)` }
        if (display === 'gallery') {
          translations = { transform: `translate3d(${calcTransformX}px,${window.scrollY}px,0px)` }
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

    return (
      <div
        id={'gallery'}
        className={conditionalClasses}
        style={translations}>
          <MainAsset
            allLoaded ={this.props.allLoaded}
            info={this.props.galleryInfo}
            addToGalleryList={this.props.addToGalleryList}
            galleryIndex={this.props.galleryIndex}
            assetIndex={0}
            onImgLoad={this.props.onImgLoad}
            thumbURL={this.props.thumbURL}
            handleSetHoverState={this.props.handleSetHoverState}
            handleOpenGallery={this.props.handleOpenGallery}
            setCurrentGalleryScrollIndex={this.props.setCurrentGalleryScrollIndex}
          />
          {display === 'gallery' ? this.generateAssets() : null}
      </div>
    )
  }
}


export {
  Gallery,
}
