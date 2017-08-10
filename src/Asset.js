import React, { Component } from 'react'
import classnames from 'classnames'
import VisibilitySensor from 'react-visibility-sensor'

class Asset extends Component {
  render() {
    let translations = {}
    if (this.props.allImagesLoaded) {
      const imageIndex = this.props.imageInfo.imageIndex
      const dX = window.innerWidth * imageIndex
      translations = { transform: `translate3d(${dX}px,0px,0px)` }
    }
    const visibility = classnames({
      'showImage': this.props.visibility,
      'hideImage': !this.props.visibility,
    })
    return (
      <div id={'assetTray'} style={translations}>
      <img
        id={'asset'}
        className={visibility}
        alt={`imageGallery_${this.props.index}`}
        src={this.props.imageURL}
        onLoad={(e) => this.props.handleOnLoad(e, this.props.index, this.props.galleryIndex)}/>
      </div>
    )
  }
}

const MainAsset = (props) => {
  const handleVisibilityChange = (change, index) => {
    change ? props.setCurrentGalleryScrollIndex(index) : null
    props.handleSetHoverState(index)
  }

  return (
    <div id={'assetTray'}>
      <VisibilitySensor offset={{top:50}} onChange={(change) => handleVisibilityChange(change, props.galleryIndex)}>
      <img
        alt={`imageGallery_${props.galleryIndex}`}
        src={props.thumbURL}
        id={'asset'}
        onLoad={(e) => props.addToGalleryList(e, props.galleryIndex)}
        onMouseEnter={(e) => props.handleSetHoverState(props.galleryIndex, true)}
        onMouseLeave={(e) => props.handleSetHoverState(props.galleryIndex, false)}
        onClick={() => props.handleOpenGallery('on', props.galleryIndex)}/>
      </VisibilitySensor>
    </div>

  )
}
export{
  Asset,
  MainAsset,
}
