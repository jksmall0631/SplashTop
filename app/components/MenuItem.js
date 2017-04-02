import React, {Component} from 'react'
import { Link } from 'react-router'
import styles from './MenuItem.css'

export default class MenuItem extends Component {
  render() {
    return (
      <figure className={styles.figure}>
        <Link
          to={this.props.route}
          className={styles.title}
          onClick={() => this.props.handleClick()}
          >
          <img className={styles.img} src={this.props.src} alt='img' />
        </Link>
            <figcaption className={styles.figcaption}>
            <h2 className={styles.linkText}>{this.props.name}</h2>
        </figcaption>
      </figure>
    )
  }
}
