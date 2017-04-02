import React, {Component} from 'react'
import electron from 'electron'
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer
import styles from './Thumbnail.css'

export default class Thumbnail extends Component {
  savePic() {
    const url = this.props.urls.full
    const fileName = this.props.id + '.png'

    ipcRenderer.send('save-photo', { fileName, url })

    ipcRenderer.once('save-photo-reply', (event, arg) => {
      console.log(arg)
    })
  }

  render() {
    return (
      //use regular or small
      <img className={styles.thumbnail} src={this.props.urls.regular} onClick={() => this.savePic()} />
    )
  }
}
