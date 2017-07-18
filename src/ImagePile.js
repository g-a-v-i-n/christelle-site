import React, { Component } from 'react'

class ImagePile extends Component {
  render() {
    return (
      <div className={'pile_outerContainer'}>
        <img src={this.props.imgList} />
      </div>
    )
  }
}

export default ImagePile
