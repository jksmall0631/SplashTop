import React, {Component} from 'react'
import Webcam from 'react-webcam'
import electron from 'electron'
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer
import styles from './Camera.css'
import Selfie from '../containers/Selfie'

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.screenshot = this.screenshot.bind(this)
  }

  screenshot() {
    const img = this.refs.webcam.getScreenshot()
    const createdAt = new Date()

    this.props.appendSelfie(img, createdAt)
  }

  savePic = () => {
    const last = this.props.selfies.length - 1
    let selfie = this.props.selfies[last]
    let img = selfie.img

    const fileName = selfie.createdAt.toISOString() + '.png'
    ipcRenderer.send('save-screenshot', { fileName, img })
    ipcRenderer.once('save-screenshot-reply', (event, arg) => {
      console.log(arg)
    })
  }

  render() {
    const last = this.props.selfies.length - 1
    const selfies = this.props.selfies.length ? this.props.selfies.map((selfie, index) => {
      return <Selfie index={index} src={selfie.img} />
    }) : null

    return (
      <div className={styles.container}>
        <Webcam className={styles.webCam} audio={false} ref='webcam' screenshotFormat='image/png' />
        <button className={styles.shutterBtn} onClick={this.screenshot}>Take Photo</button>
        <div className={styles.selfieList}>
          {selfies}
        </div>

      </div>
    )
  }
}
