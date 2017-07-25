import React, { Component } from 'react'

class Asset extends Component {
  render() {
    return (
      <div className={'image_outerContainer'}>
        <img alt={''} src={this.props.src} />
      </div>
    )
  }
}

class Gallery extends Component {

  render() {
    return (
      <div id={'pile'}>
        <Asset src={this.props.thumbURL} />
      </div>
    )
  }
}

export {
  Gallery,
  Asset,
}
