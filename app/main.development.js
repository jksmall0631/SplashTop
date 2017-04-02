import { app, BrowserWindow, ipcMain } from 'electron'
import MenuBuilder from './menu'
import { join, dirname } from 'path'
const fs = require('fs-extra')

const request = require('request')
const wallpaper = require('wallpaper')


const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    if (err) {
      console.log('There was an error downloading! Error: ', err)
      return
    }


    const dir = dirname(path)

    fs.ensureDir(dir, err => {
      console.log(err) // => null

      request(url).pipe(fs.createWriteStream(path)).on('close', callback)
    })

    // request(url).pipe(fs.createWriteStream('/tmp/' + filename)).on('close', callback)
  })
}

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
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
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer') // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
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
  console.log(args)

  const { url, fileName } = args
  const picsDir = app.getPath('pictures')
  const dest = join(picsDir, 'UnSplash-Wallpapers')
  const path = join(dest, fileName)

  download(url, path, () => setWallpaper(path))

  // event.sender.send('save-photo-reply', '')
})

ipcMain.on('save-screenshot', (event, args) => {
  const { fileName, img } = args
  console.log('args', args)
  const base64data = img.replace(/^data:image\/png;base64,/, '')
  fs.writeFile('/tmp/' + fileName, base64data, 'base64', (err) => {
    if (err) {
      console.log(err)
    } else {
      setWallpaper(fileName)
    }
  })
  // event.sender.send('save-screenshot-reply', 'yay')
})

const setWallpaper = (path) => {
  wallpaper.set(path).then(() => {
    console.log('done')
  })
}

exports.download = download
