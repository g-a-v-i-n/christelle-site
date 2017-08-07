import React, { Component } from 'react'
import lodash from 'lodash'
import classnames from 'classnames'

class Asset extends Component {
  render() {
    let translations = {}
    if (this.props.allImagesLoaded) {
      const width = this.props.imageInfo.width
      const height = this.props.imageInfo.height
      const top = this.props.imageInfo.top
      const left =this.props.imageInfo.left
      const galleryIndex = this.props.imageInfo.index
      const absoluteScreenOrigin = {
        y: window.scrollY + (window.innerHeight * 0.5),
        x: window.innerWidth * 0.5,
      }
      const dX = absoluteScreenOrigin.x - (width * 0.5)
      const dY = absoluteScreenOrigin.y - (height * 0.5)

      translations = { transform: `translate3d(${left}px,${top}px,0px)` }
    }

    return (
      <img
        id={'asset'}
        alt={`imageGallery_${this.props.index}`}
        src={this.props.imageURL}
        style={translations}
        onLoad={(e) => this.props.handleOnLoad(e, this.props.index)}/>
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
    <img
      alt={`imageGallery_${props.galleryIndex}`}
      src={props.thumbURL}
      onLoad={(e) => props.addToGalleryList(e, props.galleryIndex)}
      onMouseEnter={(e) => onMouseEnter(e, props.galleryIndex)}
      onMouseLeave={(e) => onMouseLeave(e, props.galleryIndex)}/>
  )
}
export{
  Asset,
  MainAsset,
}
