import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { PythonShell } from 'python-shell'

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/emojireplacer.db')

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS Settings (name, value)");
  db.run("CREATE TABLE IF NOT EXISTS Emojis (keyword, emoji)");
});

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    minWidth: 690,
    minHeight: 690,
    width: 1400, 
    height: 900,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.webContents.openDevTools()

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

if(process.argv[1] === '--squirrel-firstrun'){
  //Instlal python pip packages.
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('ready', async () => {
  console.log("ready")
  if(process.stdin.isTTY){
    process.stdin.setRawMode(true);
  }

  let pyshell = new PythonShell('./app/app.py')
  
  pyshell.on('message', function(message){
    console.log(message)
  })

  pyshell.end(function(err){
    if (err){
      throw err;
    }
    console.log("finished")
  })
  
})

ipcMain.handle('db-query', async (event, sqlQuery) => {
  return new Promise(res => {
      db.all(sqlQuery, (err: any, rows: unknown) => {
        res(rows);
      });
  });
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }


})

app.whenReady().then(createWindow)