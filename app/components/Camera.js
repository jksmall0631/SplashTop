import React, {Component} from 'react'
import Webcam from 'react-webcam'
import electron from 'electron'
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer

export default class Camera extends Component {
  constructor(props){
    super(props)
    this.state = {
      screenshot: ''
    }
    this.screenshot = this.screenshot.bind(this)
  }

  screenshot(){
    console.log(this)
    var screenshot = this.refs.webcam.getScreenshot();
    this.setState({
      screenshot: screenshot
    })
  }

  // savePic() {
  //   let screenshot = this.screenshot()
  //   const fileName = this.props.id + '.png'
  //   ipcRenderer.send('save-photo', { fileName, screenshot })
  //   ipcRenderer.once('save-photo-reply', (event, arg) => {
  //     console.log(arg)
  //   })
  // }

  render(){
    return (
      <div>
        <Webcam />
        <button onClick={this.screenshot}>Set Background</button>
      </div>
    )
  }
}
