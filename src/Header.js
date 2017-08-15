import React from 'react'
import { BackArrow } from './svgs'
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
          <div className={'buttonText'}>{`${key}`}</div>
        </button>
      )
    })
  }

  const handleNav = () => {
    if(props.galleryOn){
      return (
        <div className={'backButtonContainer'}>
          <button onClick={(e) => props.handleCloseGallery(e)} id={'headerButton'}>{'Back'}</button>
        </div>
      )
    } else {
      return (
        <div className={'dropdownContainer'}>
          <button onClick={(e) => props.toggleFilterMenu(e)} id={'headerButton'}>{props.filterQuery}</button>
          <div className={'dropdownWrapper'}>
            {mapDropdown()}
            <button
              id={'filterButton'}
              className={filterItemClasses}
              onClick={() => window.location.href='http://google.com'}>
              <div className={'buttonText'}>{'Blog'}</div>
            </button>
          </div>
        </div>
      )
    }
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
    <header id={'mainHeader'}>
      <div className={'christelle'}>{'Christelle de Castro'}</div>
      <nav>
        {handleNav()}
        <div id={'rule'} className={ruleClass} />
        <div className={'linkShim'}>
          <button className={'aboutLinkSetWidth reverseHoverTranslate'} id={'headerButton'} onClick={(e) => props.toggleAbout(e)}>{'About'}</button>
        </div>
      </nav>
    </header>
  )
}

const AboutHeader = (props) => {
  return (
    <header id={'aboutHeader'} className={'white-text'}>
      <div>{'About'}</div>
      <nav>
        <button id={'headerButton'} className={`backButton white-text backLink reverseHoverTranslate`} onClick={(e) => props.toggleAbout(e)}>
          <BackArrow />
          <div className={'aboutLinkSetWidth '}>{'Back'}</div>
        </button>
      </nav>
    </header>
  )
}


export {
  MainHeader,
  AboutHeader,
}
