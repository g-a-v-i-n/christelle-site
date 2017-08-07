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
    transform: `translate3d(${props.assetCoordinates.x}px,0px,0px)`,
  }
  return (
    <img
      id={'asset'}
      alt={`imageGallery_${props.index}`}
      src={props.imageSRC}
      style={translations}/>
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

  loadAllGalleryAssets = () => {
    const imageObjects = lodash.tail(this.props.fields.assets)
    return imageObjects.map((imageObject, index) => {
      // REMINDER: not sure about this math
      const assetCoordinates = {
        x: (index * window.innerWidth) + (window.innerWidth * 0.5),
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
    const absoluteScreenOrigin = {
      y: window.scrollY + (window.innerHeight * 0.5),
      x: window.innerWidth * 0.5,
    }
    const headerOffset = 100
    const dX = absoluteScreenOrigin.x - (width * 0.5)
    const dY = absoluteScreenOrigin.y - headerOffset - (height * 0.5)

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
          <div className={'slidingTray'} style={slidingTrayTransform}>
            <MainAsset
              addToGalleryList={this.props.addToGalleryList}
              galleryIndex={this.props.galleryIndex}
              assetIndex={0}
              onImgLoad={this.props.onImgLoad}
              thumbURL={this.props.thumbURL}
              handleSetHoverState={this.props.handleSetHoverState}
            />
            {display === 'gallery' ? this.loadAllGalleryAssets() : null}
          </div>
      </div>
    )
  }
}


export {
  Gallery,
}
