// electron/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Necesario para habilitar el acceso a Node.js desde el renderer
    },
  });

  console.log(`Loading URL: file://${path.join(__dirname, '../dist/angular-electron-app/browser/index.html')}`);


  // Carga la aplicación Angular
  mainWindow.loadURL(`file://${path.join(__dirname, '../dist/angular-electron-app/browser/index.html')}`);


  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});