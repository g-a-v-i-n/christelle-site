import React, { Component } from 'react'

class Home extends Component {
  componentWillMount = () => {
    this.props.getHomeGallery()
  }
  render() {
    return (
      <main className={'home'}>
      <content>
        {'Home'}
        </content>
      </main>
    )
  }
}

export default Home
