import React, {Component} from 'react'
import electron from 'electron'
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer

export default class Thumbnail extends Component {
  savePic() {
    const url = this.props.urls.full
    const fileName = this.props.id + '.png'

    ipcRenderer.send('save-photo', { fileName, url })

    ipcRenderer.once('save-photo-reply', (event, arg) => {
      console.log(arg)
    })

    // console.log('savePic()')
    // // download( this.props.urls.full, this.props.urls.id + '.png', () => {
    //   console.log('boom')
    // })
  }

  render() {
    return (
      <img src={this.props.urls.thumb} onClick={() => this.savePic()} />
    )
  }
}
