import React, { Component } from 'react'
import { Link } from 'react-router'
import { styles } from './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div styleName='bar'>
        <Link styleName='home-button' to='/'><i className="fa fa-home fa-2x"></i></Link>
      </div>
    )
  }
}
