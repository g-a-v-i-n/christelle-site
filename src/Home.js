import React, { Component } from 'react'
import { Gallery } from './Gallery'
import boxpack from 'boxpack'

class Home extends Component {
  constructor(props) {
    super(props)
    this.props.getGalleryContent()
    this.state = {
      dimensionArr: [],
      posArr: null,
      circles: [],
      boxLatch: false,
      allLoaded: false,
    }
  }

  onImgLoad = (e, index) => {
    this.setState({
      allLoaded: index === this.props.projects.length - 1 ? true : false,
      dimensionArr:
        this.state.dimensionArr.concat({
          index: index,
          width: e.target.offsetWidth,
          height:e.target.offsetHeight,
        }),
    })
  }

  boxAlgo = (boxes) => {
    if (!this.state.boxLatch) {
      const boxes = this.state.dimensionArr.map((box) => {
        return {width: box.width, height: box.height}
      })
      const posArr = boxpack().pack(boxes)
      this.setState({
        boxLatch: true,
        posArr: posArr,
      })
    }
  }

  generatePiles = () => {
    return this.props.projects.map((project, index) => {
      return (
        <Gallery
          thumbIndex={index}
          homeCoordinates={this.state.posArr !== null ? this.state.posArr[index] : this.state.posArr}
          onImgLoad={this.onImgLoad}
          thumbURL={project.fields.assets[0].fields.file.url}
          assets ={project.fields.assets}
          client={project.fields.client}
          date={project.fields.date}
          projectName={project.fields.projectName}
          projectType={project.fields.projectType}
          key={`Pile_${project.fields.projectName}`}
        />
      )
    })
  }

  render() {
    if (this.state.allLoaded) {
      this.boxAlgo(this.state.dimensionArr)
    }
    return (
      <main className={'home'}>
        <content>
          {this.generatePiles()}
        </content>
      </main>
    )
  }
}

export default Home
