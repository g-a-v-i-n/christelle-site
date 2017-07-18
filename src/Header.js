import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'



const MainHeader = (props) => {
  return(
    <header>
      <Link to={'/'}>{'Christelle de Castro'}</Link>
      <nav>
        <div className={'dropdownContainer'}>
          {props.mapDropdown()}
        </div>
        <div className={'navLongDash'} />
        <div className={'linkShim'}>
          <Link to={'/about'}>{'About'}</Link>
        </div>
      </nav>
    </header>
  )
}

const AboutHeader = (props) => {
  return(
    <header className={'white-text'}>
      {'About'}
      <nav>
        <Link className={'white-text'} to={'/'}>{'Back'}</Link>
      </nav>
    </header>
  )
}

class Header extends Component {

  handleMenuItemClasses = () => {
    if (this.props.menuOpen) {
      return 'menuItem_visible'
    } else {
      return 'menuItem_hidden'
    }
  }

  mapDropdown = () => {
    const menu = this.props.menuTitles.map((menuTitle) => {
      return (
        <button className={this.handleMenuItemClasses()} key={menuTitle} onClick={(e) => this.props.setFilterQuery(e, menuTitle)}>{`${menuTitle}`}</button>
      )
    })
    return menu
  }

  swapHeaders = () => {
    let localHeaderProps = {
      handleMenuItemClasses: this.handleMenuItemClasses,
      mapDropdown: this.mapDropdown,
    }
    if (this.props.location.pathname == '/') {
      return <MainHeader {...this.props} {...localHeaderProps} />
    } else {
      return <AboutHeader {...this.props} {...localHeaderProps}/>
    }
  }



  render() {
    return (
      <div>
      {this.swapHeaders()}
      </div>
    )
  }
}

const HeaderWithRouter = withRouter(Header)
export default HeaderWithRouter
