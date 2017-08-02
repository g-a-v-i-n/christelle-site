import React, { Component } from 'react'
import lodash from 'lodash'
import classnames from 'classnames'

class Asset extends Component {

  onMouseEnter = (e, index) => {
    e.stopPropagation()
    this.props.handleSetHoverState('hover', index)
  }

  onMouseLeave = (e, index) => {
    e.stopPropagation()
    this.props.handleSetHoverState('default', index)
  }

  render() {
    return (
      <img
        alt={`imageGallery_${this.props.index}`}
        src={this.props.thumbURL}
        onLoad={(e) => this.props.addToGalleryList(e, this.props.index)}
        onMouseEnter={(e) => this.onMouseEnter(e, this.props.index)}
        onMouseLeave={(e) => this.onMouseLeave(e, this.props.index)}/>
    )
  }
}

class Gallery extends Component {

  handleGalleryClose = (index) => {
    this.props.handleGalleryDisplay('default', index)
  }

  handleGalleryOpen = (index) => {
    this.props.handleGalleryDisplay('on', index)

  }

  render() {
    let translations = {}
    if (!lodash.isEmpty(this.props.galleryCoordinates)) {
      let x = this.props.galleryCoordinates.x
      let y = this.props.galleryCoordinates.y
      let dX = this.props.absScreenOrigin.x - (this.props.galleryCoordinates.width * 0.5)
      let dY = this.props.absScreenOrigin.y - 50 - (this.props.galleryCoordinates.height * 0.5)
      translations = { transform: `translate(${x}px,${y}px)` }
      if (this.props.display === 'on') {
        translations = { transform: `translate(${dX}px,${dY}px)` }
      }
    }
    let conditionalClasses = classnames({
      'transitions': this.props.allLoaded,
      'galleryDefault': this.props.display === 'default',
      'galleryOn': this.props.display === 'on',
      'galleryOff': this.props.display === 'off',

      'galleryForward': this.props.hover === 'forward',
      'galleryFade': this.props.hover === 'fade',
      'galleryDefault': this.props.hover === 'default',
      'ignoreHover': this.props.hover === 'ignoreHover',
    })
    return (
      <div id={'gallery'} className={conditionalClasses} style={translations} onClick={() => this.handleGalleryOpen(this.props.index)}>
        <Asset
          addToGalleryList={this.props.addToGalleryList}
          index={this.props.index}
          onImgLoad={this.props.onImgLoad}
          thumbURL={this.props.thumbURL}
          handleSetHoverState={this.props.handleSetHoverState}
        />
      </div>
    )
  }
}

export {
  Gallery,
  Asset,
}
