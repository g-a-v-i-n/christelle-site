import React, { Component } from 'react'
import { BackArrow } from './svgs'
import classnames from 'classnames'
import Anime from 'react-anime'

class MainHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      aboutHover: false,
      menuHover: false,
    }
  }

  mapDropdown = (filterItemClasses) => {
    return this.props.filters.map((key) => {
      return (
        <button
          id={'filterButton'}
          className={filterItemClasses}
          key={key}
          onClick={(e) => this.props.setFilterQuery(e, key)}
          onMouseEnter={() => this.setState({menuHover: true})}
          onMouseLeave={() => this.setState({menuHover: false})}>
          <div className={'buttonText'}>{`${key}`}</div>
        </button>
      )
    })
  }

  handleNav = (filterItemClasses) => {
    if(this.props.galleryOn){
      return (
        <div className={'backButtonContainer'}>
          <button onClick={(e) => this.props.handleCloseGallery(e)} id={'headerButton'}>{'Back'}</button>
        </div>
      )
    } else {
      return (
        <div className={'dropdownContainer'}>
          <button onClick={(e) => this.props.toggleFilterMenu(e)} id={'headerButton'}>{this.props.filterQuery}</button>
          <div className={'dropdownWrapper'}>
            {this.mapDropdown(filterItemClasses)}
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

  handleRuleTranslation = () => {
    if (this.state.aboutHover) {
      return '1rem'
    } else if (this.state.menuHover) {
      return '-1rem'
    } else {
      return '0rem'
    }
  }

  render() {
    const filterItemClasses = classnames({
      'showMenuItem': this.props.filterMenuOpen,
      'hideMenuItem': !this.props.filterMenuOpen,
    })

    const closeGalleryButtonClasses = classnames({
      'showClose': this.props.galleryOn,
      'hideClose': !this.props.galleryOn,
    })

    const ruleClass = classnames({
      'showRule': !this.props.filterMenuOpen,
      'hideRule': this.props.filterMenuOpen,
    })

    return (
      <header id={'mainHeader'}>
        <div className={'christelle'}>{'Christelle de Castro'}</div>
        <nav>
          {this.handleNav(filterItemClasses)}
            <div id={'rule'} className={ruleClass} />
          <div className={'linkShim'}>
            <button
              className={'aboutLinkSetWidth'}
              id={'headerButton'}
              onClick={(e) => this.props.toggleAbout(e)}
              onMouseEnter={() => this.setState({aboutHover: true})}
              onMouseLeave={() => this.setState({aboutHover: false})}>
                {'About'}
              </button>
          </div>
        </nav>
      </header>
    )
  }
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
