import React, { Component } from 'react'
import { Link } from 'react-router'
import Thumbnail from './Thumbnail'
import AutoResponsive from 'autoresponsive-react'

export default class UnSplash extends Component {
  constructor(props) {
    super(props);
  }

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
