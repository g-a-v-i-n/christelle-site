import React, { Component } from 'react'
import lodash from 'lodash'
import classnames from 'classnames'

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
  const onMouseEnter = (e, index) => {
    e.stopPropagation()
    props.handleSetHoverState(true, index)
  }

  const onMouseLeave = (e, index) => {
    e.stopPropagation()
    props.handleSetHoverState(false, index)
  }

  return (
    <div id={'assetTray'}>
    <img
      alt={`imageGallery_${props.galleryIndex}`}
      src={props.thumbURL}
      id={'asset'}
      onLoad={(e) => props.addToGalleryList(e, props.galleryIndex)}
      onMouseEnter={(e) => onMouseEnter(e, props.galleryIndex)}
      onMouseLeave={(e) => onMouseLeave(e, props.galleryIndex)}
      onClick={() => props.handleOpenGallery('on', props.galleryIndex)}/>
      </div>
  )
}
export{
  Asset,
  MainAsset,
}
