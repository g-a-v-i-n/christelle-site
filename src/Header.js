import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

const MainHeader = (props) => {
  const filterItemClasses = classnames({
    'showMenuItem': props.filterMenuOpen,
    'hideMenuItem': !props.filterMenuOpen,
  })
  const mapDropdown = () => {
    return props.filters.map((key) => {
      return (
        <button
          id={'filterButton'}
          className={filterItemClasses}
          key={key}
          onClick={(e) => props.setFilterQuery(e, key)}>
          {`${key}`}
        </button>
      )
    })
  }

  const closeGalleryButtonClasses = classnames({
    'showClose': props.galleryOn,
    'hideClose': !props.galleryOn,
  })

  const ruleClass = classnames({
    'showRule': !props.filterMenuOpen,
    'hideRule': props.filterMenuOpen,
  })

  return (
    <header>
      <div className={'christelle'}>{'Christelle de Castro'}</div>
      <nav>
        <div className={'dropdownContainer'}>
          <button onClick={(e) => props.toggleFilterMenu(e)} id={'headerFilterButton'}>{props.filterQuery}</button>
          <div className={'dropdownWrapper'}>{mapDropdown()}</div>
        </div>
        <div id={'rule'} className={ruleClass} />

        <div className={'linkShim'}>
          <button className={'aboutLinkSetWidth'} onClick={(e) => props.toggleAbout(e)}>{'About'}</button>
        </div>
      </nav>
    </header>
  )
}

const AboutHeader = (props) => {
  return (
    <header className={'white-text'}>
      {'About'}
      <nav>
        <button className={`white-text backLink`} to={'/'}>
          <div className={'backArrow'} />
          {'Back'}
        </button>
      </nav>
    </header>
  )
}


export {
  MainHeader,
  AboutHeader,
}
