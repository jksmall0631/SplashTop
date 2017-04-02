import React, {Component} from 'react'
import Webcam from 'react-webcam'
import electron from 'electron'
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer
import styles from './Camera.css'
import Selfie from '../containers/Selfie'

export default class Camera extends Component {
  takeSelfie = () => {
    const img = this.refs.webcam.getScreenshot()
    const createdAt = new Date()

    this.props.appendSelfie(img, createdAt)
  }



  render() {
    const last = this.props.selfies.length - 1
    const { selfies } = this.props
    const allSelfies = selfies.length ? selfies.map((selfie, index) => {
      return <Selfie key={index} index={index} src={selfie.img} />
    }) : null

    return (
      <div className={styles.container}>
        <Webcam className={styles.webCam} audio={false} ref='webcam' screenshotFormat='image/png' />
        <button className={styles.shutterBtn} onClick={this.takeSelfie}>Take Photo</button>
        <div className={styles.selfieList}>
          {allSelfies}
        </div>

      </div>
    )
  }
}
