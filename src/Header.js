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
      backHover: false,
    }
  }

  mapDropdown = (filterItemClasses) => {
    return this.props.filters.map((key) => {
      return (
        <button
          id={'filterButton'}
          className={filterItemClasses}
          key={key}
          onClick={(e) => this.props.setFilterQuery(e, key)}>
          <div className={'buttonText'}>{`${key}`}</div>
        </button>
      )
    })
  }

  handleFilterMenu = (filterItemClasses) => {
    return (
      <div className={'dropdownContainer'}>
        <button
          onMouseEnter={() => this.setState({menuHover: true})}
          onMouseLeave={() => this.setState({menuHover: false})}
          onClick={(e) => this.props.toggleFilterMenu(e)}
          id={'headerButton'}>{this.props.filterQuery}</button>
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

  render() {
    const closeGalleryButtonClasses = classnames({
      'showClose': this.props.galleryOn,
      'hideClose': !this.props.galleryOn,
    })
    const filterItemClasses = classnames({
      'showMenuItem': this.props.filterMenuOpen,
      'hideMenuItem': !this.props.filterMenuOpen,
    })
    const ruleClass = classnames({
      'showRule': !this.props.filterMenuOpen,
      'nudgeRuleLeft': this.state.menuHover && !this.props.filterMenuOpen,
      'nudgeRuleRight': this.state.aboutHover && !this.props.filterMenuOpen,
      'hideRuleHover': this.props.filterMenuOpen && this.state.menuHover,
      'hideRuleNoHover': this.props.filterMenuOpen && !this.state.menuHover,
    })

    const backNavClasses = classnames({
      'showBackNav': this.props.galleryOn,
      'hideBackNav': !this.props.galleryOn,
    })
    const feedNavClasses = classnames({
      'showFeedNav': !this.props.galleryOn,
      'hideFeedNav': this.props.galleryOn,
    })
    return (
      <header id={'mainHeader'}>
        <div className={'christelle'}>{'Christelle de Castro'}</div>

        <nav>
          <div id={'backNav'} className={backNavClasses}>
            <div className={'backArrowContainer'}>
              <Anime duration={250} easing="easeInOutCubic" >
                <svg width="150px" height="50px" viewBox="0 0 150 50" version="1.1">
                  <g id="Groups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                    <g id="Artboard" stroke="#000000">
                      <Anime
                        easing="easeInOutCubic"
                        duration={250}
                        d={this.state.backHover ? "M149.5,25.5 L8.5,25.5" : "M149.5,25.5 L48.5,25.5"}
                        id="arrowline" >
                      <path d="M149.5,25.5 L48.5,25.5" id="arrowline"></path>
                      </Anime>
                      <Anime
                        easing="easeInOutCubic"
                        duration={250}
                        transform={this.state.backHover ? "translate(8.000000, 10.000000)" : "translate(48.000000, 10.000000)"}
                        id="arrowline">
                        <g id="arrowhead" transform="translate(86.000000, 60.000000)">
                        <path d="M0.5,15.5 L15.0086181,0.991381871" id="upperLine"></path>
                        <path d="M0.5,15.5 L15.5,30.5" id="lowerLine"></path>
                        </g>
                      </Anime>
                    </g>
                  </g>
                </svg>
              </Anime>
            </div>
            <button
              onClick={(e) => this.props.handleCloseGallery(e)}
              onMouseEnter={() => this.setState({backHover: true})}
              onMouseLeave={() => this.setState({backHover: false})}
              id={'headerButton'}>
              {'Back'}
            </button>
          </div>

          <div id={'feedNav'} className={feedNavClasses}>
            {this.handleFilterMenu(filterItemClasses)}
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
          </div>
          </nav>
      </header>
    )
  }
}

class AboutHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      backHover: false,
    }
  }
  render() {
    return (
      <header id={'aboutHeader'} className={'white-text'}>
        <div>{'About'}</div>
        <nav>
        <div id={'backNav'}>
          <div className={'backArrowContainer'}>
            <Anime duration={250} easing="easeInOutCubic" >
              <svg width="150px" height="50px" viewBox="0 0 150 50" version="1.1">
                <g id="Groups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                  <g id="Artboard" stroke="#FFF">
                    <Anime
                      easing="easeInOutCubic"
                      duration={250}
                      d={this.state.backHover ? "M149.5,25.5 L8.5,25.5" : "M149.5,25.5 L48.5,25.5"}
                      id="arrowline" >
                    <path d="M149.5,25.5 L48.5,25.5" id="arrowline"></path>
                    </Anime>
                    <Anime
                      easing="easeInOutCubic"
                      duration={250}
                      transform={this.state.backHover ? "translate(8.000000, 10.000000)" : "translate(48.000000, 10.000000)"}
                      id="arrowline">
                      <g id="arrowhead" transform="translate(86.000000, 60.000000)">
                      <path d="M0.5,15.5 L15.0086181,0.991381871" id="upperLine"></path>
                      <path d="M0.5,15.5 L15.5,30.5" id="lowerLine"></path>
                      </g>
                    </Anime>
                  </g>
                </g>
              </svg>
            </Anime>
          </div>
          <button
            onClick={(e) => this.props.toggleAbout(e)}
            onMouseEnter={() => this.setState({backHover: true})}
            onMouseLeave={() => this.setState({backHover: false})}
            id={'headerButton'}
            className={'white-text'}>
            {'Close Gallery'}
          </button>
        </div>
        </nav>
      </header>
    )
  }
}


export {
  MainHeader,
  AboutHeader,
}
