import { app, BrowserWindow, ipcMain } from 'electron'
import MenuBuilder from './menu'
import { join, dirname } from 'path'
const fs = require('fs-extra')
const request = require('request')
const wallpaper = require('wallpaper')
const notifier = require('node-notifier')
const progress = require('progress-stream')

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  require('electron-debug')() // eslint-disable-line global-require
  const sourceMapSupport = require('source-map-support') // eslint-disable-line
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')() // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    const installer = require('electron-devtools-installer') // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS',
    ]

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS

    // TODO: Use async interation statement.
    //       Waiting on https://github.com/tc39/proposal-async-iteration
    //       Promises will fail silently, which isn't what we want in development
    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log)
  }
}

app.on('ready', async () => {
  await installExtensions()

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: join(__dirname, '/assets/icons/png/64x64.png'),
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
})

ipcMain.on('save-photo', (event, args) => {
  const { url, fileName } = args
  const picsDir = app.getPath('pictures')
  const path = join(picsDir, 'SplashTop-Wallpapers', fileName)
  downloadPic(url, path)
  .then(_ => wallpaper.set(path, { scale: 'fill' }))
  .then(_ => {
    notifier.notify({
      'title': 'Wallpaper Updated',
      'message': 'Updated Your Desktop Wallpaper',
      'sound': false,
      'contentImage': path,
    })
    mainWindow.setProgressBar(-1)
    event.sender.send('save-photo-success', 'photo saved!')
  })
  .catch(err => event.sender.send('save-photo-error', err))
})

ipcMain.on('save-selfie', (event, args) => {
  const { fileName, img } = args

  saveSelfie(fileName, img)
  .then(path => wallpaper.set(path, { scale: 'fill' }))
  .then(_ => {
    notifier.notify({
      'title': 'Wallpaper Updated',
      'message': 'Updated Your Desktop Wallpaper to Your Selfie',
      'sound': false,
    })
    event.sender.send('save-selfie-reply', 'selfie saved!')
  })
  .catch(err => event.sender.send('save-selfie-error', err))
})

const saveSelfie = (fileName, img) => {
  return new Promise((resolve, reject) => {
    const picsDir = app.getPath('pictures')
    const path = join(picsDir, 'SplashTop-Selfies', fileName)
    const dir = dirname(path)

    fs.ensureDir(dir, err => {
      if (err) { reject(err) }
      const base64data = img.replace(/^data:image\/png;base64,/, '')
      fs.writeFile(path, base64data, 'base64', resolve(path))
    })
  })
}

const downloadPic = (url, path) => {
  return new Promise((resolve, reject) => {
    const dir = dirname(path)

    fs.ensureDir(dir, err => {
      if (err) { reject(err) }

      let stream = progress({ time: 50 })

      stream.on('progress', progress => {
        mainWindow.setProgressBar(progress.percentage / 100.0)
      })

      request
        .get(url)
        .on('response', res => {
          stream.setLength(res.headers['content-length'])
        })
        .pipe(stream)
        .pipe(fs.createWriteStream(path))
        .on('close', resolve)
    })
  })
}
