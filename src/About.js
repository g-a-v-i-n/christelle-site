import React, { Component } from 'react'
import Markdown from 'react-markdown'

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

const ClientListItem = (props) => {
  if (props.index !== props.length - 1) {
    return(
      <div className={'clientListItem'}>{`${props.clientName},`}</div>
    )
  } else {
    return(
      <div className={'clientListItem'}>{`${props.clientName}`}</div>
    )
  }
}

export default class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      bioText: ''
    }
    document.title = 'Christelle de Castro – About'
  }

  componentWillMount = () => {
    this.props.getAboutContent()
  }

  makeClientList = () => {
    return (
      this.props.clientList.map((clientName, index) => {
        return (
          <ClientListItem key={`clientListItem__${clientName}`} clientName={clientName} index={index} length={this.props.clientList.length}/>
        )
      })
    )
  }

  parseInstagram = (inputString) => {
    if (inputString) {
      let username
      let handle
      if (inputString.charAt(0) === '@') {
        username = inputString.substr(1);
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


  render() {
    const contact = this.props.contact
    return (
      <main className={'about'}>

        <section className={'bio'}><Markdown source={this.props.biography} /></section>
        <section className={'contact'}>
          <ul>
            <ContactItem title={'Email'} content={this.returnEmail(contact.email)} />
            <ContactItem title={'Instagram'} content={this.parseInstagram(contact.instagram)} />
          </ul>
          <div className={'clientList'}>
            <ContactItem title={'Clients'} content={this.makeClientList()} />
          </div>
        </section>
      </main>
    )
  }
}
