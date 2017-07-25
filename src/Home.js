import React, { Component } from 'react'
import { Gallery } from './Gallery'

class Home extends Component {
  constructor(props) {
    super(props)
    this.props.getGalleryContent()
    this.state = {
      dimensions: {},
    }
    this.onImgLoad = this.onImgLoad.bind(this)
    }

    onImgLoad({target:img}) {
      this.setState({
        dimensions:{
          height:img.offsetHeight,
          width:img.offsetWidth,
        },
      })
    }

  componentWillMount = () => {
  }

  generatePiles = () => {
    return this.props.projects.map((project) => {
      const origin = [30, 60]

      return (
        <Gallery
          thumbURL={project.fields.assets[0].fields.file.url}
          assets ={project.fields.assets}
          key={`Pile_${project.fields.projectName}`}
          client={project.fields.client}
          date={project.fields.date}
          projectName={project.fields.projectName}
          projectType={project.fields.projectType}
        />
      )
    })
  }

  render() {
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
