import React, {Component} from 'react'

export default class Thumbnail extends Component {
  render() {
    return (
      <img src={this.props.urls.thumb} />
    )
  }
}
