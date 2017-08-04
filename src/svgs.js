import React from 'react'

const LeftGalleryArrow = (props) => {
  return (
    <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
        <g id="Groups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
            <g id="Artboard" stroke="#000000">
                <path d="M49.5,75.5 L149.5,75.5" id="arrowline"></path>
                <g id="arrowhead" transform="translate(56.000000, 75.500000) scale(-1, 1) translate(-56.000000, -75.500000) translate(48.000000, 60.000000)">
                    <path d="M15.5,15.5 L0.991381871,0.991381871" id="Line-2"></path>
                    <path d="M15.5,15.5 L0.5,30.5" id="Line-2"></path>
                </g>
            </g>
        </g>
    </svg>
  )
}

const RightGalleryArrow = (props) => {
  return (
    <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
        <g id="Groups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
            <g id="Artboard" stroke="#000000">
                <path d="M0.5,75.5 L100.5,75.5" id="arrowline"></path>
                <g id="arrowhead" transform="translate(86.000000, 60.000000)">
                    <path d="M15.5,15.5 L0.991381871,0.991381871" id="Line-2"></path>
                    <path d="M15.5,15.5 L0.5,30.5" id="Line-2"></path>
                </g>
            </g>
        </g>
    </svg>
  )
}

export {
  LeftGalleryArrow,
  RightGalleryArrow,
}
