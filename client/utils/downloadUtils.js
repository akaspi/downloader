import { ipcRenderer } from 'electron';

function download(url, onStart, onDownload, onEnd) {

    function onDownloadStart(event, props) {
        onStart({ fileSize: props.total });
    }

    function whileDownloading(event, props) {
        onDownload({ chunk: props.chunk });
    }

    ipcRenderer.on('download-start', onDownloadStart);

    ipcRenderer.on('download-on', whileDownloading);

    ipcRenderer.on('download-end', () => {
        ipcRenderer.removeListener('download-start', onDownloadStart);
        ipcRenderer.removeListener('download-on', whileDownloading);
        onEnd();
    });

    ipcRenderer.send('download-file', { url });
}

export { download };