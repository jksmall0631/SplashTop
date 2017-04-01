import React, {Component} from 'react'
import Webcam from 'react-webcam'
import electron from 'electron'
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer
import { Button } from 'react-desktop/macOs'

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.screenshot = this.screenshot.bind(this)
  }

  screenshot() {
    console.log(this)
    const selfie = this.refs.webcam.getScreenshot()
    const createdAt = new Date();

    this.props.appendSelfie(selfie, createdAt)
  }

  savePic = () => {
    let screenshot = this.props.selfies.selfie
    const fileName = this.props.selfies.createdAt.toISOString() + '.png'
    ipcRenderer.send('save-screenshot', { fileName, screenshot })
    ipcRenderer.once('save-screenshot-reply', (event, arg) => {
      console.log(arg)
    })
  }

  render() {
    return (
      <div>
        <Webcam audio={false} ref='webcam' screenshotFormat='image/png' />
        <Button onClick={this.screenshot}>Take Photo</Button>
        <img src={this.props.selfies.selfie} />

        <Button onClick={this.savePic}>Set Wallpaper</Button>
      </div>
    )
  }
}
