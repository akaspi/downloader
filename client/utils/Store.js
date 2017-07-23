import { observable, computed, action } from 'mobx';
import { listenToDownloadStatusUpdates, sendDownloadRequest } from './ipcMessageHandler';

class Store {
    @observable downloads;

    constructor() {
        this.downloads = observable.map({});
        listenToDownloadStatusUpdates(this.updateDownloadStatus);
    }

    @action.bound updateDownloadStatus(url, status) {
        let downloadStatus = this.downloads.get(url);
        downloadStatus.fileSize = status.fileSize;
        downloadStatus.chunk += status.chunk;
        this.downloads.set(url, downloadStatus);
    };

    @action.bound startDownload(url) {
        this.downloads.set(url, {
            fileSize: 0,
            chunk: 0
        });
        sendDownloadRequest(url);
    };

    @computed get urlsToDownload() {
        return this.downloads.keys();
    }

    getDownloadStatus = url => {
        return this.downloads.get(url);
    }
}

export default Store;