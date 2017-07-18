import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  handleHeaderHeading = () => {
    switch (this.props.location.pathname) {
      default:
        return 'Christelle de Castro'
      case '/about':
        return 'About'
    }
  }

  render() {
    return (
      <header>
        <Link to={'/'}>{this.handleHeaderHeading()}</Link>
        <nav>
          <Link to={'index'}>{'Writing'}</Link>
          <div className={'navLongDash'} />
          <Link to={'about'}>{'About'}</Link>
        </nav>
      </header>
    )
  }
}

const HeaderWithRouter = withRouter(Header)
export default HeaderWithRouter
