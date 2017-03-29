// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Home.css'
import natGeo from '../assets/nat-geo.jpg'

export default class Home extends Component {
  grabPhotos = () => {
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
              <img className={styles.imgresponsive} src={natGeo} alt='National Geographic image' />
              <div className={styles.overlay}>
                <h2>Hover effect 4</h2>
                <Link to='/unsplash' className={styles.info} onClick={() => this.grabPhotos()}>link here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
