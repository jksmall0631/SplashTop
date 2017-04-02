import React, {Component} from 'react'
import Webcam from 'react-webcam'
import electron from 'electron'
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer
import styles from './Selfie.css'

export default class Selfie extends Component {
  handleClick = () => {
    let selfie = this.props.selfies[this.props.index]
    let img = selfie.img

    const fileName = selfie.createdAt.toISOString() + '.png'
    ipcRenderer.send('save-screenshot', { fileName, img })
    ipcRenderer.once('save-screenshot-reply', (event, arg) => {
      console.log(arg)
    })
  }

  render() {
    return (
      <div key={this.props.index} className={styles.container} onClick={this.handleClick}>
        <img className={styles.thumb} src={this.props.src} />
      </div>
    )
  }
}
