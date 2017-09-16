import React, { Component } from 'react'
import classnames from 'classnames'

export default class GalleryControls extends Component {
  constructor(props){
    super(props)
    this.state = {
      leftHover: false,
      rightHover: false,
    }
  }

  render () {
    const duration = 220
    const rightActive = this.props.currentGalleryIndex < this.props.totalFrames - 1 ? true : false
    const leftActive = this.props.currentGalleryIndex !== 0 ? true : false
    const galleryControlClasses = classnames({
      'showControls': this.props.galleryOn,
      'hideControls': !this.props.galleryOn,
    })
    const leftArrowContainerClasses = classnames({
      'hideArrow': !leftActive,
      'arrowContainer': true,
      'leftArrowContainer': true,
    })
    const rightArrowContainerClasses = classnames({
      // 'hideArrow': !rightActive,
      'arrowContainer': true,
      'rightArrowContainer': true,
    })
    return (
      <div id={'galleryControls'} className={galleryControlClasses}>
        <div
          className={leftArrowContainerClasses}
          onClick={(e) => this.props.handleRetreatGallery(e)}>
          <div className={'backwardContainer'}>{'Backward'}</div>
        </div>
        <div
          className={rightArrowContainerClasses}
          style={rightActive ? {} : {pointerEvents: 'none'}}
          onClick={(e) => this.props.handleAdvanceGallery(e)}>
          <div className={'forwardContainer'} >{rightActive ? 'Forward' : 'End'}</div>
        </div>
      </div>
    )
  }
}
