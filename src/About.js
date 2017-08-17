import React, { Component } from 'react'
import Markdown from 'react-markdown'
import { AboutHeader } from './Header'
import { AboutArrow, LeftGalleryArrow } from './svgs'
import classnames from 'classnames'
import Anime from 'react-anime'

const ContactItem = (props) => {
  return (
    <li>
      <div className={'aboutItemTitle'}>{props.title}</div>
      <span className={'aboutItemBody'}>
        <div className={'smallDash'}/>
        <div className={'content'}>
          <p>{props.content}</p>
        </div>
        </span>
    </li>
  )
}

export default class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      open: false,
      hover: false,
      imgLoaded: false,
      metaSectionClassArray: ['about-meta', 'about-closed'],
      portraitStyle: {},
    }
  }

  makeList = (clientList) => {
    return <Markdown source={clientList} />
  }

  parseInstagram = (inputString) => {
    if (inputString) {
      let username
      let handle
      if (inputString.charAt(0) === '@') {
        username = inputString.substr(1)
        handle = inputString
      } else {
        username = inputString
        handle = '@' + inputString
      }
      return (
        <a href={`https://www.instagram.com/${username}/`}>{handle}</a>
      )
    }
  }

  returnEmail = (email) => {
    return (
      <a href={`mailto:${email}`} target={'_top'}>{email}</a>
    )
  }

  handleToggleHover = (key) => {
    this.setState.hover({
      hover: !this.state.hover,
    })
  }

  applyMetaSectionClass = () => {
    return this.state.metaSectionClassArray.join(' ')
  }


  toggleMetaTray = (e) => {
    e.preventDefault()
      this.setState({
        open: !this.state.open,
      })
  }

  switchLine1 = () => {
    if (!this.state.open) {
      return !this.state.hover ? "M74,125 L74,25" : "M74,125 L74,5"
    } else {
      return !this.state.hover ? "M75,25 L75,125" : "M75,25 L75,145"
    }
  }

  switchLine2 = () => {
    if (!this.state.open) {
      return !this.state.hover ? "M74,24 L88,38" : "M74,4 L88,18"
    } else {
      return !this.state.hover ? "M75,126 L89,112" : "M75,146 L89,132"
    }
  }

  switchLine3 = () => {
    if (!this.state.open) {
      return !this.state.hover ? "M74,24 L60,38" : "M74,4 L60,18"
    } else {
      return !this.state.hover ? "M75,126 L61,112" : "M75,146 L61,132"
    }
  }



  render() {
    const contact = this.props.contact
    const trayStyle = classnames({
      'tray-open': this.state.open,
      'tray-open-hover': this.state.open && this.state.hover,
      'tray-closed': !this.state.open,
      'tray-closed-hover': !this.state.open && this.state.hover,

    })

    const trayTransitionClasses = classnames({
      'tray-in': !this.props.aboutOpen,
      'tray-out': this.props.aboutOpen,
      'trayWrapper_tray-open': this.state.open,
      'trayWrapper_tray-closed': !this.state.open,
    })

    const aboutClasses = classnames({
      'about-open': this.props.aboutOpen,
      'about-closed': !this.props.aboutOpen,
    })

    const portraitStyle = { backgroundImage: `url(${this.props.portrait.url})` }
    const duration= 300

    return (
      <main id={'about'} className={aboutClasses} >
      <div id={'aboutScrollContainer'}>
      <AboutHeader {...this.props} />
      <div id={'contentWrapper'}>
        <div id={'aboutArrowContainer'}>
          <Anime duration={duration} easing="easeInOutCubic">
          <svg width="150px" height="150px" viewBox="0 0 150 150" version="1.1">
            <g id="Groups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
              <g id="Tray-arrow-up" stroke="#FFF">
                <Anime duration={duration} easing="easeInOutCubic" d={this.switchLine1()}>
                  <path d="M74,125 L74,25" id="Line-1"></path>
                </Anime>
                <Anime duration={duration} easing="easeInOutCubic" d={this.switchLine2()}>
                  <path d="M74,24 L88,38" id="Line-2"></path>
                </Anime>
                <Anime duration={duration} easing="easeInOutCubic" d={this.switchLine3()}>
                  <path d="M74,24 L60,38" id="Line-3"></path>
                </Anime>
              </g>
            </g>
          </svg>
          </Anime>
        </div>

        <section className={'bio'}><Markdown source={this.props.biography} /></section>
        <section id={'bio-portrait'} style={portraitStyle}/>

        <div id={'trayWrapper'} className={trayTransitionClasses}>
          <section
            id={'tray'}
            className={trayStyle}
            onClick={(e) => this.toggleMetaTray(e)}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}>
            <div className={'about-left'}>
            <ul>
              <ContactItem title={'Email'} content={this.returnEmail(contact.email)} />
              <ContactItem title={'Instagram'} content={this.parseInstagram(contact.instagram)} />
            </ul>
            <div className={'clientList'}>
              <ContactItem title={'Clients'} content={this.makeList(this.props.clientList)} />
            </div>
            </div>
            <div className={'about-right'}>
              <div className={'clientList'}>
                <ContactItem title={'Exhibitions'} content={this.makeList(this.props.exhibitionList)} />
              </div>
              <div className={'clientList'}>
                <ContactItem title={'Press'} content={this.makeList(this.props.pressList)} />
              </div>
            </div>
          </section>
        </div>

        </div>
        </div>
      </main>
    )
  }
}
