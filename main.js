const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const downloader = require('./downloader');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    ipcMain.on('download-file', (event, props) => {
        downloader(props.url, {
            start: ({ total }) => mainWindow.send('download-start', { total }),
            on: ({ chunk }) => mainWindow.send('download-on', { chunk }),
            end: () => mainWindow.send('download-end')
        });
    });
});