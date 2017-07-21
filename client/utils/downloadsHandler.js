import { ipcRenderer } from 'electron';

export function init(onMessage) {
    ipcRenderer.on('download-start', (event, props) => {
        onMessage({
            type: 'DOWNLOAD_START',
            url: props.url,
            fileSize: props.total
        });
    });

    ipcRenderer.on('download-on', (event, props) => {
        onMessage({
            type: 'DOWNLOADING',
            url: props.url,
            chunk: props.chunk
        });
    });

    ipcRenderer.on('download-end', (event, props) => {
        onMessage({
            type: 'DOWNLOAD_END',
            url: props.url
        });
    });
}

export function download(url) {
    ipcRenderer.send('download-file', { url });
}

export const MESSAGE_TYPES = {
    DOWNLOAD_START: 'DOWNLOAD_START',
    DOWNLOADING: 'DOWNLOADING',
    DOWNLOAD_END: 'DOWNLOAD_END'
};