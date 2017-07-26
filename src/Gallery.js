import React, { Component } from 'react'

class Asset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      homeCoordinates: {x:0, y:0},
      dimensions: {width:0, height:0},
      loaded: false,
      positionLatch: false,
    }
  }

  onImgLoad = (e) => {
    this.setState({
      loaded: true,
      dimensions: {
        width: e.target.offsetWidth,
        height: e.target.offsetHeight,
      },
    })
  }

  render() {
    const index = this.props.index
    if (this.state.loaded && !this.state.positionLatch) {
      this.props.addToGalleryList({index, dimensions: this.state.dimensions})
    }
    return (
      <img onLoad={(e) => this.onImgLoad(e)} alt={''} src={this.props.thumbURL} />
    )
  }
}

class Gallery extends Component {
  render() {
    let translateStyle = {}
    if (this.props.homeCoordinates !== null) {
      translateStyle = { transform: `translate(${this.props.homeCoordinates.x}px, ${this.props.homeCoordinates.y}px)`}
    }
    return (
      <div id={'pile'} style={translateStyle}>
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
