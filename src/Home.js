import React, { Component } from 'react'
import ImagePile from './ImagePile'
import Image from './Image'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterQuery: false,
      renderList: [],
    }
  }

  componentWillMount = () => {
    this.props.getGalleryContent()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.projectList) {
      let renderList = nextProps.projectList.items.map((item) => {
        return item.fields
      })
      this.setState({
        renderList,
      })
    }
  }

  parseGalleries = (filterQuery) => {
    const renderList = this.state.renderList
    let newRenderList = []
    if (filterQuery) {
      newRenderList = renderList.filter((item) => {
        return item.type === filterQuery
      })
      this.setState({
        renderList: newRenderList
      })
    }
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
