import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {
  render() {
    return (
      <header>
        <Link to={'/'}>{'Christelle De Castro'}</Link>
        <nav>
          <Link to={'index'}>{'Index'}</Link>
          <div className={'navLongDash'} />
          <Link to={'about'}>{'About'}</Link>
        </nav>
      </header>
    )
  }
}

export default Header
