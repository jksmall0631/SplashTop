import React, {Component} from 'react'
const ipcRenderer = require('electron').ipcRenderer
import styles from './Thumbnail.css'

export default class Thumbnail extends Component {
  savePic() {
    const url = this.props.urls.full
    const fileName = this.props.id + '.png'

    ipcRenderer.send('save-photo', { fileName, url })

    ipcRenderer.once('save-photo-success', (event, args) => {
      console.log('event', event)
      console.log('args', args)
    })
    
    ipcRenderer.once('save-photo-error', (event, args) => {
      console.log('event', event)
      console.log('args', args)
    })
  }

  render() {
    // use regular or small
    return (
      <img className={styles.thumbnail} src={this.props.urls.regular} onClick={() => this.savePic()} />
    )
  }
}
