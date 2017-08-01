import React, { Component } from 'react'
import lodash from 'lodash'
import classnames from 'classnames'

class Asset extends Component {

  onMouseEnter = (e, index) => {
    e.stopPropagation()
    this.props.setScreenState(true, index)
  }

  onMouseLeave = (e, index) => {
    e.stopPropagation()
    this.props.setScreenState(false, index)
  }

  render() {
    let imgClasses = classnames({
      'imgOn': this.props.hover,
      'imgFade': !this.props.hover,
    })

    return (
      <img
        className={imgClasses}
        alt={`imageGallery_${this.props.index}`}
        src={this.props.thumbURL}
        onLoad={(e) => this.props.addToGalleryList(e, this.props.index)}
        onMouseEnter={(e) => this.onMouseEnter(e, this.props.index)}
        onMouseLeave={(e) => this.onMouseLeave(e, this.props.index)}/>
    )
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleGalleryClose = () => {
    this.setState({
      open: true,
    })
  }

  handleGalleryClose = () => {
    this.setState({
      open: false,
    })
  }
  render() {
    let translations = {}
    if (!lodash.isEmpty(this.props.galleryCoordinates)) {
      translations = {
        transform: `translate(${this.props.galleryCoordinates.x}px,${this.props.galleryCoordinates.y}px)`,
      }
    }
    return (
      <div id={'pile'} style={translations}>
        <Asset
          hover={this.props.hover}
          addToGalleryList={this.props.addToGalleryList}
          index={this.props.index}
          onImgLoad={this.props.onImgLoad}
          thumbURL={this.props.thumbURL}
          setScreenState={this.props.setScreenState}
        />
      </div>
    )
  }
}

export {
  Gallery,
  Asset,
}
