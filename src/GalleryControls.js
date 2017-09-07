import React, { Component } from 'react'
import Anime from 'react-anime'
import classnames from 'classnames'

export default class GalleryControls extends Component {
  constructor(props){
    super(props)
    this.state = {
      leftHover: false,
      rightHover: false,
    }
  }

  render() {
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
      'hideArrow': !rightActive,
      'arrowContainer': true,
      'rightArrowContainer': true,
    })
    return (
      <div id={'galleryControls'} className={galleryControlClasses}>
      <div
        className={leftArrowContainerClasses}
        onClick={(e) => this.props.handleRetreatGallery(e)}
        onMouseEnter={() => this.setState({leftHover: true})}
        onMouseLeave={() => this.setState({leftHover: false})}>
        <div className={'backwardContainer'}>{'Backward'}</div>
        {
        //   <Anime duration={duration} easing="easeInOutCubic" opacity={this.state.leftHover ? 1 : 0}>
        //   <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
        //     <g id="Groups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
        //       <g id="Artboard" stroke="#000000">
        //         <Anime
        //           easing="easeInOutCubic"
        //           duration={duration}
        //           d={this.state.leftHover ? "M9.5,75.5 L149.5,75.5" : "M49.5,75.5 L149.5,75.5"}
        //           id="arrowline" >
        //         <path d="M49.5,75.5 L149.5,75.5" id="arrowline"></path>
        //         </Anime>
        //         <Anime
        //           easing="easeInOutCubic"
        //           duration={duration}
        //           transform={this.state.leftHover ? "translate(8.000000, 60.000000)" : "translate(48.000000, 60.000000)"}
        //           id="arrowline">
        //           <g id="arrowhead" transform="translate(86.000000, 60.000000)">
        //           <path d="M0.5,15.5 L15.0086181,0.991381871" id="upperLine"></path>
        //           <path d="M0.5,15.5 L15.5,30.5" id="lowerLine"></path>
        //           </g>
        //         </Anime>
        //       </g>
        //     </g>
        //   </svg>
        // </Anime>
      }
      </div>
        <div
          className={rightArrowContainerClasses}
          onClick={(e) => this.props.handleAdvanceGallery(e)}
          onMouseEnter={() => this.setState({rightHover: true})}
          onMouseLeave={() => this.setState({rightHover: false})}>
          {
          //   <Anime duration={duration} easing="easeInOutCubic" opacity={this.state.rightHover ? 1 : 0}>
          //   <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
          //     <g id="Groups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
          //       <g id="Artboard" stroke="#000000">
          //       <Anime
          //         easing="easeInOutCubic"
          //         duration={duration}
          //         d={this.state.rightHover ? "M0.5,75.5 L140.5,75.5" : "M0.5,75.5 L100.5,75.5"}
          //         id="arrowline" >
          //       <path d="M49.5,75.5 L149.5,75.5" id="arrowline"></path>
          //       </Anime>
          //       <Anime
          //         easing="easeInOutCubic"
          //         duration={duration}
          //         transform={this.state.rightHover ? "translate(126.000000, 60.000000)" : "translate(86.000000, 60.000000)"}
          //         id="arrowline">
          //         <g id="arrowhead" transform="translate(86.000000, 60.000000)">
          //           <path d="M15.5,15.5 L0.650757595,30.3492424" id="upperline"></path>
          //           <path d="M15.5,15.5 L0.650757595,0.650757595" id="lowerline"></path>
          //         </g>
          //       </Anime>
          //       </g>
          //     </g>
          //   </svg>
          // </Anime>
        }
          <div className={'forwardContainer'}>{'Forward'}</div>
        </div>
      </div>
    )
  }
}
