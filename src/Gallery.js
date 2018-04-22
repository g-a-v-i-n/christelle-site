import React, { Component } from 'react'
import { MainAsset, Asset, VideoAsset, BlankAsset } from './Asset'
import lodash from 'lodash'

class Gallery extends Component {
  generateAssets = () => {
    const imageObjects = lodash.tail(this.props.fields.assets)
    let imageInfo = {}
    return imageObjects.map((asset, index) => {
      if (this.props.allImagesLoaded) { imageInfo = this.props.loadedImages[index] }
      const assetProps = {
        index: index + 1,
        allImagesLoaded : this.props.allImagesLoaded,
        imageInfo: imageInfo,
        galleryIndex: this.props.galleryIndex,
        imageURL: asset.fields.file.url,
        handleOnLoad: this.props.addToPhotoList,
        visibility: this.props.galleryVisibility,
      }
      if (/\b(images.ctfassets.net)\b/.test(asset.fields.file.url)) {
        return <Asset {...assetProps}/>
      } else if (/\b(videos.ctfassets.net)\b/.test(asset.fields.file.url)) {
        return <VideoAsset {...assetProps}/>
      } else {
        return <BlankAsset {...assetProps}/>
      }
    })
  }

  render() {
    let translations = {}
    const hover = this.props.galleryInfo.hover
    const display = this.props.galleryInfo.display
    if (this.props.allLoaded) {
      const top = this.props.galleryInfo.top
      const left =this.props.galleryInfo.left
      const calcTransformX = -this.props.currentGalleryIndex * window.innerWidth
      // calculate element x/y transform
        translations = { transform: `translate3d(${left}px,${top}px,0px)`}
        if (display === 'gallery_display-gallery') {
          translations = { transform: `translate3d(${calcTransformX}px,${window.scrollY}px,0px)` }
        }
      }

    return (
      <div
        id={'gallery'}
        className={`${hover} ${display}`}
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
          {display === 'gallery_display-gallery' ? this.generateAssets() : null}
      </div>
    )
  }
}


export {
  Gallery,
}
