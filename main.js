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
        const { url } = props;

        downloader(url, status => {
            mainWindow.send('download-status', {
                url,
                fileSize: status.fileSize,
                chunk: status.chunk
            });
        });
    });

});