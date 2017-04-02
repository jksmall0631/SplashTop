// @flow
import React, { Component } from 'react'
import MenuItem from './MenuItem'
import { Link } from 'react-router'
import styles from './Home.css'
import Webcam from 'react-webcam'

export default class Home extends Component {
  constructor() {
    super()
    this.grabPhotos = this.grabPhotos.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown(e) {
    if (e.keyCode === 32) {
      e.preventDefault()
      this.grabPhotos()
    }
  }

  grabPhotos() {
    console.log('grab')
    const url = 'https://api.unsplash.com/photos/random/?count=6&client_id=b7d9a9651c33cfd071e500dd4494a5c3c6653e34f38ea82fc889cf6aff8b0def'
    fetch(url)
    .then(response => response.json())
    .then(response => {
      this.props.storePics(response)
    })
  }

  render() {
    return (
      <div className={styles.grid}>
        <div>
          <Link to='/camera'>
            <Webcam audio={false} height={300} width={350}/>
            <h2>Webcam</h2>
          </Link>
        </div>

        <div>
          <MenuItem
            name='Unsplash'
            src='https://source.unsplash.com/random/350x300'
            route='/unsplash'
            handleClick={this.grabPhotos}
          />

          {/* <MenuItem name='Something Else' src='../assets/web-camera-icon.png' route='/camera' /> */}
        </div>
      </div>
    )
  }
}
