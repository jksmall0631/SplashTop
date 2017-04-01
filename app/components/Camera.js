import React, {Component} from 'react'
import Webcam from 'react-webcam'
import electron from 'electron'
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer
import { Button } from 'react-desktop/macOs'

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenshot: null,
      created_at: null,
    }
    this.screenshot = this.screenshot.bind(this)
  }

  screenshot() {
    console.log(this)
    var screenshot = this.refs.webcam.getScreenshot()

    this.setState({
      screenshot: screenshot,
      created_at: new Date(),
    })
  }

  savePic = () => {
    let screenshot = this.state.screenshot
    const fileName = this.state.created_at.toISOString() + '.png'
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
        <img src={this.state.screenshot} />

        <Button onClick={this.savePic}>Set Wallpaper</Button>
      </div>
    )
  }
}
