import 'reflect-metadata';
import { app, BrowserWindow, dialog } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { initializeDatabase } from './backend/db/data-source';
import { registerBackendHandlers } from './backend/ipc/register-handlers';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const iconPath = MAIN_WINDOW_VITE_DEV_SERVER_URL
  ? path.join(process.cwd(), 'public', 'favicon.ico')
  : path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/favicon.ico`);

const trustedOrigins = MAIN_WINDOW_VITE_DEV_SERVER_URL ? new Set([new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL).origin]) : new Set<string>();

function isTrustedUrl(targetUrl: string) {
  try {
    const parsedUrl = new URL(targetUrl);
    return parsedUrl.protocol === 'file:' || trustedOrigins.has(parsedUrl.origin);
  } catch {
    return false;
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1180,
    minHeight: 760,
    autoHideMenuBar: true,
    show: false,
    icon: iconPath,
    webPreferences: {
      devTools: Boolean(MAIN_WINDOW_VITE_DEV_SERVER_URL),
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.webContents.on('will-navigate', (event, targetUrl) => {
    if (!isTrustedUrl(targetUrl)) {
      event.preventDefault();
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(async () => {
  try {
    await initializeDatabase();
    registerBackendHandlers();
    createWindow();
  } catch (error) {
    dialog.showErrorBox(
      'No se pudo iniciar la aplicacion',
      `${error instanceof Error ? error.message : 'Error desconocido.'}\n\nVerifica que PostgreSQL este disponible y que las variables de entorno esten configuradas correctamente.`,
    );
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
