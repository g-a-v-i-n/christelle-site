import React from 'react'
import classnames from 'classnames'

const LeftGalleryArrow = (props) => {
  let arroheadClasses = classnames({
    'arrowHeadOn': props.active,
    'arrowHeadOff': !props.active,
  })
  let lineClasses = classnames({
    'lineStretch': props.active,
    'noLineStretch': !props.active,
  })
  return (
    <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
        <g id="Groups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
            <g id="Artboard" stroke="#000000">
                <path d="M49.5,75.5 L149.5,75.5" className={lineClasses} id="arrowline"></path>
                <g id="arrowhead" className={lineClasses} transform="translate(56.000000, 75.500000) scale(-1, 1) translate(-56.000000, -75.500000) translate(48.000000, 60.000000)">
                    <path className={arroheadClasses} d="M15.5,15.5 L0.991381871,0.991381871" id="upperline"></path>
                    <path className={arroheadClasses} d="M15.5,15.5 L0.5,30.5" id="lowerline"></path>
                </g>
            </g>
        </g>
    </svg>
  )
}

const RightGalleryArrow = (props) => {
  let arroheadClasses = classnames({
    'arrowHeadOn': props.active,
    'arrowHeadOff': !props.active,
  })
  let lineClasses = classnames({
    'lineStretch': props.active,
    'noLineStretch': !props.active,
  })
  return (
    <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
      <g id="Groups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
          <g id="Artboard" stroke="#000000">
            <path d="M0.5,75.5 L100.5,75.5" className={lineClasses} id="arrowline"></path>
              <g id="arrowhead" className={lineClasses} transform="translate(86.000000, 60.000000)">
                  <path className={arroheadClasses} d="M15.5,15.5 L0.650757595,30.3492424" id="upperline"></path>
                  <path className={arroheadClasses} d="M15.5,15.5 L0.650757595,0.650757595" id="lowerline"></path>
              </g>
          </g>
      </g>
    </svg>
  )
}

const AboutArrow = (props) => {
  return (
    <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
        <g id="Groups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
            <g id="Artboard" stroke="#FFFFFF">
                <path d="M75,150 L75,50" id="arrowline"></path>
                <g id="arrowhead" transform="translate(75.000000, 56.500000) scale(-1, 1) rotate(-90.000000) translate(-75.000000, -56.500000) translate(67.000000, 41.000000)">
                    <path d="M15.5,15.5 L0.991381871,0.991381871" id="Line-2"></path>
                    <path d="M15.5,15.5 L0.5,30.5" id="Line-2"></path>
                </g>
            </g>
        </g>
    </svg>
  )
}

const BackArrow = (props) => {
  let arroheadClasses = classnames({
    'arrowHeadOn': props.active,
    'arrowHeadOff': !props.active,
  })

  return (
    <svg className={'backButtonArrow'} width="150px" height="32px" viewBox="0 0 150 32" version="1.1">
        <g id="Groups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
            <g id="backArrowshort" stroke="#FFFFFF">
                <path d="M50,16 L150,16" id="arrowline"></path>
                <g id="arrowhead" transform="translate(48.000000, 0.000000)">
                    <path d="M0.5,15.5 L15.0086181,0.991381871" id="upperLine"></path>
                    <path d="M0.5,15.5 L15.5,30.5" id="lowerLine"></path>
                </g>
            </g>
        </g>
    </svg>
  )
}

export {
  LeftGalleryArrow,
  RightGalleryArrow,
  AboutArrow,
  BackArrow,
}
