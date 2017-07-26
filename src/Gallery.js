import React, { Component } from 'react'

class Thumb extends Component {
  render() {
    return (
      <div className={'image_outerContainer'}>
        <img onLoad={(e) => this.props.onImgLoad(e, this.props.thumbIndex)} alt={''} src={this.props.src} />
      </div>
    )
  }
}

class Gallery extends Component {

  render() {
    let translate = {}
    if (this.props.homeCoordinates !== null) {
      translate = {
        transform: `translate(${this.props.homeCoordinates.x}px, ${this.props.homeCoordinates.y}px)`,
      }
    }
    return (
      <div id={'pile'} style={translate}>
        <Thumb thumbIndex={this.props.thumbIndex} onImgLoad={this.props.onImgLoad} src={this.props.thumbURL} style={translate}/>
      </div>
    )
  }
}

export {
  Gallery,
  Thumb,
}
