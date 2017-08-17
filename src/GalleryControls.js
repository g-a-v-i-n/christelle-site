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
    const galleryControlClasses = classnames({
      'showControls': this.props.galleryOn,
      'hideControls': !this.props.galleryOn,
    })
    const duration = 300
    const rightActive = this.props.currentGalleryIndex < this.props.totalFrames - 1 ? true : false
    const leftActive = this.props.currentGalleryIndex !== 0 ? true : false
    return (
      <div id={'galleryControls'} className={galleryControlClasses}>
        <div
          className={'arrowContainer leftArrowContainer'}
          onClick={(e) => this.props.handleRetreatGallery(e)}
          onMouseEnter={() => this.setState({leftHover: true})}
          onMouseLeave={() => this.setState({leftHover: false})} >
        <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
            <g id="Groups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
                <g id="Artboard" stroke="#000000">
                    <path d="M49.5,75.5 L149.5,75.5" id="arrowline"></path>
                    <g id="arrowhead" transform="translate(56.000000, 75.500000) scale(-1, 1) translate(-56.000000, -75.500000) translate(48.000000, 60.000000)">
                        <path d="M15.5,15.5 L0.991381871,0.991381871" id="upperline"></path>
                        <path d="M15.5,15.5 L0.5,30.5" id="lowerline"></path>
                    </g>
                </g>
            </g>
        </svg>
        </div>
        <div
          className={'arrowContainer rightArrowContainer'}
          onClick={(e) => this.props.handleAdvanceGallery(e)}
          onMouseEnter={() => this.setState({rightHover: true})}
          onMouseLeave={() => this.setState({rightHover: false})}>
          <Anime duration={duration} easing="easeInOutCubic" opacity={this.state.rightHover ? 1 : 0}>
            <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
              <g id="Groups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                <g id="Artboard" stroke="#000000">
                <Anime
                  easing="easeInOutCubic"
                  duration={duration}
                  d={this.state.rightHover ? "M0.5,75.5 L140.5,75.5" : "M0.5,75.5 L100.5,75.5"}
                  id="arrowline" >
                <path d="M49.5,75.5 L149.5,75.5" id="arrowline"></path>
                </Anime>
                <Anime
                  easing="easeInOutCubic"
                  duration={duration}
                  transform={this.state.rightHover ? "translate(126.000000, 60.000000)" : "translate(86.000000, 60.000000)"}
                  id="arrowline">
                  <g id="arrowhead" transform="translate(86.000000, 60.000000)">
                    <path d="M15.5,15.5 L0.650757595,30.3492424" id="upperline"></path>
                    <path d="M15.5,15.5 L0.650757595,0.650757595" id="lowerline"></path>
                  </g>
                </Anime>
                </g>
              </g>
            </svg>
          </Anime>
          <div className={'forwardContainer'}>{'Forward'}</div>
        </div>
      </div>
    )
  }
}
