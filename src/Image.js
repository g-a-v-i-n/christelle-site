import React, { Component } from 'react'

class Image extends Component {
  render() {
    return (
      <div className={'image_outerContainer'}>
        <img src={this.props.imgsrc} />
      </div>
    )
  }
}

export default Image
