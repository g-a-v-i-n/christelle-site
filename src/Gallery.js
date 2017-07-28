import React, { Component } from 'react'

class Asset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      homeCoordinates: {x:0, y:0},
      dimensions: {width:0, height:0},
      loaded: false,
    }
  }

  handleImageLoaded() {
    this.setState({ loaded: true})


  }

  handleImageErrored() {
    this.setState({ imageStatus: 'failed to load' })
  }

  render() {
    return (
      <img ref={`imageGallery_${this.props.index}`} src={this.props.thumbURL} onLoad={(e) => this.props.addToGalleryList(e, this.props.index)} />
    )
  }
}

class Gallery extends Component {
  render() {

    return (
      <div id={'pile'}>
        <Asset
          addToGalleryList={this.props.addToGalleryList}
          index={this.props.index}
          onImgLoad={this.props.onImgLoad}
          thumbURL={this.props.thumbURL}
        />
      </div>
    )
  }
}

export {
  Gallery,
  Asset,
}
