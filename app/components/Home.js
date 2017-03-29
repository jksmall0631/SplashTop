// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import natGeo from '../assets/nat-geo.jpg'


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <div className={styles.natgeo}>
              <div className={styles.hovereffect}>
                  <img className={styles.imgresponsive} src={natGeo} alt=""/>
                  <div className={styles.overlay}>
                     <h2>National Geographic</h2>
                     <a className={styles.info} href="#">Click for photos</a>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
