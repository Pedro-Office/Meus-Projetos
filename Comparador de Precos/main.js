const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')
const path = require('node:path')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    webPreferences:{
        preload:path.join(__dirname, 'libs', 'preload.js')
    },
    height: 600
  })

  win.loadFile(path.join(__dirname, 'views','index.html'))
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => {console.log('pong')})
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})