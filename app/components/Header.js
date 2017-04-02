import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className={styles.bar}>
        <Link className={styles.homeButton} to='/'><i className="fa fa-home fa-2x"></i></Link>
        <h1 className={styles.title}>SplashTop</h1>
        <div className={styles.divider}></div>
      </div>
    )
  }
}
