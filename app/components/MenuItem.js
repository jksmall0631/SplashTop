import React, {Component} from 'react'
import { Link } from 'react-router'
import { styles } from './MenuItem.css'

export default class MenuItem extends Component {
  render() {
    return (
      <figure styleName='figure'>
        <img styleName='img' src={this.props.src} alt='img' />
        <figcaption styleName='figcaption'>
          <Link
            to={this.props.route}
            styleName='title'
            onClick={() => this.props.handleClick()}
          >
            <h2 styleName='link-text'>{this.props.name}</h2>
          </Link>
        </figcaption>
      </figure>
    )
  }
}
