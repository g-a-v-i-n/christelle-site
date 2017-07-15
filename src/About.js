import React, { Component } from 'react'

const ContactItem = (props) => {
  <li>
    {props.title}
    <span className={'indent'}>
      <div className={'smallDash'}/>
      <div className={'content'}>
        {props.content}
      </div>
    </span>
  </li>
}

class About extends Component {
  render() {
    return (
      <main className={'about'}>
        <section className={'bio'}>{'content goes here'}</section>
        <section className={'contact'}>
          <ul>
            <li>
              {'Email'}
            </li>
            <li>
              {'Instagram'}
            </li>
            <li>
              {'Clients'}
            </li>
          </ul>
        </section>
      </main>
    )
  }
}

export default About
