import { ipcRenderer } from 'electron';

export function listenToDownloadStatusUpdates(onMessage) {
    ipcRenderer.on('download-status', (event, props) => {
        onMessage(props.url, {
            fileSize: props.fileSize,
            chunk: props.chunk
        });
    });
}

export function sendDownloadRequest(url) {
    ipcRenderer.send('download-file', { url });
}