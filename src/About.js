import React, { Component } from 'react'
import Markdown from 'react-markdown'
import { AboutHeader } from './Header'
import { AboutArrow, LeftGalleryArrow } from './svgs'
import classnames from 'classnames'

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

  handleMetaHover = (trigger) => {
    if (trigger === 'enter') {
      this.setState({
        hover: true,
      })
    } else {
      this.setState({
        hover: false,
      })
    }
  }

  toggleMetaTray = (e) => {
    e.preventDefault()
      this.setState({
        open: !this.state.open,
      })
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
    })

    const aboutClasses = classnames({
      'about-open': this.props.aboutOpen,
      'about-closed': !this.props.aboutOpen,
    })

    const portraitStyle = { backgroundImage: `url(${this.props.portrait.url})` }


    return (
      <main id={'about'} className={aboutClasses} >
      <div id={'aboutScrollContainer'}>
      <AboutHeader {...this.props} />
      <div id={'contentWrapper'}>
        <div
          id={'aboutArrowContainer'}
          onMouseEnter={() => this.handleMetaHover('enter')}
          onMouseLeave={() => this.handleMetaHover('leave')}
          onClick={(e) => this.toggleMetaTray(e)} >
          <AboutArrow />
        </div>
        <section className={'bio'}><Markdown source={this.props.biography} /></section>
        <section id={'bio-portrait'} style={portraitStyle}/>
        <div id={'trayWrapper'} className={trayTransitionClasses}>
          <section id={'tray'} className={trayStyle}>
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
