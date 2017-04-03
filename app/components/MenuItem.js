import React, {Component} from 'react'
import { Link } from 'react-router'
import styles from './MenuItem.css'

export default class MenuItem extends Component {
  render() {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className={styles.hovereffect}>
          <img className={styles.imgresponsive} src='https://source.unsplash.com/random/450x350' />
          <div className={styles.overlay}>
            <h2>UnSplash</h2>
            <Link
              className={styles.info}
              to={this.props.route}
              onClick={() => this.props.handleClick()}
            > Click for backgrounds
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
