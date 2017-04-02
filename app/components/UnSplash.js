import React, { Component } from 'react'
import Thumbnail from './Thumbnail'

export default class UnSplash extends Component {
  render() {
    let thumbnails
    if (this.props.pics) {
      thumbnails = this.props.pics.map(pic => {
        return <Thumbnail key={pic.id} className='item' {...pic} />
      })
    }

    return (
      <div>
        {thumbnails}
      </div>
    )
  }
}
