import React, {Component} from 'react'
const ipcRenderer = require('electron').ipcRenderer
import styles from './Selfie.css'

export default class Selfie extends Component {
  saveSelfie = () => {
    let selfieObj = this.props.selfies[this.props.index]
    let img = selfieObj.img

    const fileName = selfieObj.createdAt.toISOString() + '.png'
    ipcRenderer.send('save-selfie', { fileName, img })
    ipcRenderer.once('save-selfie-success', (event, arg) => {
      console.log('success', arg)
    })

    ipcRenderer.once('save-selfie-error', (event, arg) => {
      console.error(arg)
    })
  }

  render() {
    return (
      <div key={this.props.index} className={styles.container} onClick={this.saveSelfie}>
        <img className={styles.thumb} src={this.props.src} />
      </div>
    )
  }
}
