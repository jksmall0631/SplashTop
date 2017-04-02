import React, { Component } from 'react'
import Thumbnail from './Thumbnail'
import styles from './UnSplash.css'

export default class UnSplash extends Component {
  render() {
    let thumbnails
    if (this.props.pics) {
      thumbnails = this.props.pics.map(pic => {
        return <Thumbnail key={pic.id} className='item' {...pic} />
      })
    }

    return (
      <div className={styles.main}>
        <h4>Unsplash Photos</h4>
        {thumbnails}
      </div>
    )
  }
}
