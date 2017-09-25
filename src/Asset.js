import React, { Component } from 'react'
import classnames from 'classnames'

const Asset = (props) => {
    let translations = {}
    if (props.allImagesLoaded) {
      const imageIndex = props.imageInfo.imageIndex
      const dX = window.innerWidth * imageIndex
      translations = { transform: `translate3d(${dX}px,0px,0px)` }
    }
    const visibility = classnames({
      'showImage': props.visibility,
      'hideImage': !props.visibility,
    })
    return (
      <div id={'assetTray'} style={translations}>
      <img
        id={'asset'}
        className={visibility}
        alt={`imageGallery_${props.index}`}
        src={props.imageURL}
        onLoad={(e) => props.handleOnLoad(e, props.index, props.galleryIndex)}/>
      </div>
    )
}

class VideoAsset extends Component{
  componentDidMount = () => {
    const e = {
      target: '',
    }
    this.props.handleOnLoad(e, this.props.index, this.props.galleryIndex)
  }
  render () {
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
      <video
        controls
        id={'asset'}
        className={visibility}
        alt={`imageGallery_${this.props.index}`}
        src={this.props.imageURL}/>
      </div>
    )
  }
}

const MainAsset = (props) => {
  return (
    <div id={'assetTray'}>
      <img
        alt={`imageGallery_${props.galleryIndex}`}
        src={props.thumbURL}
        id={'asset'}
        className={'imageScale'}
        onLoad={(e) => props.addToGalleryList(e, props.galleryIndex)}
        onMouseEnter={() => props.handleSetHoverState(props.galleryIndex,  window.innerWidth > 1000 ? true : false)}
        onMouseLeave={() => props.handleSetHoverState(props.galleryIndex, window.innerWidth > 1000 ? false : false)}
        onClick={() => props.handleOpenGallery(props.galleryIndex)}/>
    </div>
  )
}

const BlankAsset = (props) => {
  return (
    <div id={'assetTray'}>
      <div />
    </div>
  )
}

export{
  Asset,
  MainAsset,
  BlankAsset,
  VideoAsset,
}
