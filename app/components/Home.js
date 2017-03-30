// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Home.css'
import natGeo from '../assets/nat-geo.jpg'

export default class Home extends Component {
  constructor(){
    super()
    this.grabPhotos = this.grabPhotos.bind(this)
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this))
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
      <div>
        <div className={styles.container} data-tid='container'>
          <div className={styles.natgeo}>
            <div className={styles.hovereffect}>
              <img className={styles.imgresponsive} src='https://source.unsplash.com/random/300x350' alt='Unsplash Image Placeholder' />
              <div className={styles.overlay}>
                <h2>UnSplash</h2>
                <Link to='/unsplash' className={styles.info} onClick={() => this.grabPhotos()}>Click for more backgrounds</Link>
              </div>
            </div>
          </div>
        </div>
        <Link to='/camera'>Camera</Link>
      </div>
    )
  }
}
