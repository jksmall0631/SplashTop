import React, { Component } from 'react'
import { Link } from 'react-router'
import Thumbnail from './Thumbnail'

export default class UnSplash extends Component {
  render() {
    let thumbnails
    if (this.props.pics) {
      thumbnails = this.props.pics.map(pic => {
        return <Thumbnail {...pic} />
      })
    }
    return (
      <div>
        <Link to='/'>Home</Link>
        {thumbnails}
      </div>
    )
  }
}
