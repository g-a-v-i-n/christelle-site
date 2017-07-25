import React, { Component } from 'react'
import Markdown from 'react-markdown'
import _ from 'lodash'

const ContactItem = (props) => {
  return (
    <li>
      {props.title}
      <span className={'aboutItemBody'}>
        <div className={'smallDash'}/>
        <div className={'content'}>
          {props.content}
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
      metaOpen: false,
      hover: false,
      imgLoaded: false,
      metaSectionClassArray: ['about-meta', 'about-closed'],
      portraitStyle: {},
    }
    document.title = 'Christelle de Castro – About'
  }

  componentWillMount = () => {
    this.props.getAboutContent()
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

  handleMetaSectionEvents = (e, eventKey) => {
    e.preventDefault()
    e.stopPropagation()
    let classArray = this.state.metaSectionClassArray
    if (classArray.indexOf('about-open') === -1) {
      switch (eventKey) {
        case 'mouseEnter':
          _.pull(classArray, 'about-hover-off')
          classArray.push('about-hover-on')
          break
        case 'mouseLeave':
          _.pull(classArray, 'about-hover-on')
          classArray.push('about-hover-off')
          break
        case 'onClick':
          _.pull(classArray, 'about-closed')
          classArray.push('about-open')
          break
        default: console.error('About.js handleMetaSectionEvents() switch error top section')
        }
    } else {
      switch (eventKey) {
        case 'mouseEnter':
          _.pull(classArray, 'about-hover-off')
          classArray.push('about-hover-on')
          break
        case 'mouseLeave':
          _.pull(classArray, 'about-hover-on')
          classArray.push('about-hover-off')
          break
        case 'onClick':
          _.pull(classArray, 'about-open')
          classArray.push('about-closed')
          break
        default: console.error('About.js handleMetaSectionEvents() switch error bottom section')
        }
    }
    classArray = _.uniq(classArray)
    this.setState({
      metaSectionClassArray: classArray,
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


  render() {
    const portraitStyle = { backgroundImage: `url(${this.props.portrait.url})` }
    const contact = this.props.contact
    return (
      <main className={'about'}>
        <button
          className={'arrowToggle'}
          onMouseEnter={(e) => this.handleMetaSectionEvents(e, 'mouseEnter')}
          onMouseLeave={(e) => this.handleMetaSectionEvents(e, 'mouseLeave')}
          onClick={(e) => this.handleMetaSectionEvents(e, 'onClick')} />
        <section className={'bio'}><Markdown source={this.props.biography} /></section>
        <section className={'bio-portrait'} style={portraitStyle}/>
        <section className={this.applyMetaSectionClass()}>
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
      </main>
    )
  }
}
