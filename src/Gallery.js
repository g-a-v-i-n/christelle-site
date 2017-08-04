import React, { Component } from 'react'
import lodash from 'lodash'
import classnames from 'classnames'

const MainAsset = (props) => {
  const onMouseEnter = (e, index) => {
    e.stopPropagation()
    props.handleSetHoverState(true, index)
  }

  const onMouseLeave = (e, index) => {
    e.stopPropagation()
    props.handleSetHoverState(false, index)
  }

    return (
      <img
        alt={`imageGallery_${props.galleryIndex}`}
        src={props.thumbURL}
        onLoad={(e) => props.addToGalleryList(e, props.galleryIndex)}
        onMouseEnter={(e) => onMouseEnter(e, props.galleryIndex)}
        onMouseLeave={(e) => onMouseLeave(e, props.galleryIndex)}/>
    )
}

const Asset = (props) => {
  // REMINDER: Index does not include the thumbnail
  const translations = {
    transform: `translate3d(${props.assetCoordinates.x}px,${props.assetCoordinates.y}px,0px)`,
  }
  return (
    <img
      id={'asset'}
      alt={`imageGallery_${props.index}`}
      src={props.imageSRC}
      style={translations}
      onLoad={(e) => props.tallyAssetsOnLoad(e, props.index)}/>
  )
}

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allAssetsLoaded: false,
      galleryFrame: 0,
    }
  }
  tallyAssetsOnLoad = (assetIndex) => {
    // console.log(assetIndex)
  }

  loadAllGalleryAssets = () => {
    const imageObjects = lodash.tail(this.props.fields.assets)

    return imageObjects.map((imageObject, index) => {
      // REMINDER: not sure about this math
      const assetCoordinates = {
        x: (index * window.innerWidth) + window.innerWidth,
        y: 0,
      }
      return (
        <Asset
          index
          imageSRC={imageObject.fields.file.url}
          title={imageObject.fields.file.title}
          tallyAssetsOnLoad={this.tallyAssetsOnLoad}
          assetCoordinates={assetCoordinates}/>
      )
    })
  }

  render() {
    const hover = this.props.galleryInfo.hover
    const display = this.props.galleryInfo.display
    const width = this.props.galleryInfo.width
    const height = this.props.galleryInfo.height
    const top = this.props.galleryInfo.top
    const left =this.props.galleryInfo.left
    const node = this.props.galleryInfo.node
    const galleryIndex = this.props.galleryInfo.index

    const dX = 50
    const dY = 50

    // calculate element x/y transform
    let translations = {}
    if (this.props.allLoaded) {
      // console.log(top)
      translations = { transform: `translate3d(${left}px,${top}px,0px)` }
      if (display === 'gallery') {
        translations = { transform: `translate3d(${dX}px,${dY}px,0px)` }
      }
    }

    // set hover and display classes
    let conditionalClasses = classnames({
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
          {this.props.display === 'on' ? this.loadAllGalleryAssets() : null}
      </div>
    )
  }
}


export {
  Gallery,
}
