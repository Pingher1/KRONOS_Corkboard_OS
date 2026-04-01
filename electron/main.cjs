const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    frame: true,       // Native MacOS frame
    titleBarStyle: 'hiddenInset', // Sleek Apple Native header integration
    backgroundColor: '#000000', // Pitch black before React paints
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Bypasses CORS so KRONOS can rip data from APIs directly
    }
  });

  // Depending on whether we are in dev or production, we load the Vite server or the built files
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    // Load the active running React server locally (The Sovereign State)
    mainWindow.loadURL('http://localhost:5173');
    // Open Developer Tools automatically for the KRONOS Command Center engineering
    // mainWindow.webContents.openDevTools();
  } else {
    // Load the compiled distribution HTML during the .dmg build phase
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Prevent white flashes on load (wait until Liquid UI is physically ready)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  // Listen for window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // THE KRONOS KILL-SWITCH: Bind Cmd+Shift+Q or Esc for sovereign control.
  globalShortcut.register('CommandOrControl+Shift+K', () => {
    app.quit();
  });
}

// OS Bootloader Hook
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// OS Kill Switch logic
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
