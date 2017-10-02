import { extendObservable, observable, computed, action } from 'mobx';
import * as firebaseAPI from './firebaseAPI';

console.log('dsadads');

class User {
    @observable uid;
    @observable photoURL;

    constructor(authData) {
        const { uid, photoURL } = authData;
        extendObservable(this, { uid, photoURL });
    }
}

class DownloadItem {
    @observable url;
    @observable size;
    @observable chunk;

    constructor(url, size = 0, chunk = 0) {
        extendObservable(this, { url, size, chunk });
    }

    get completed() {
        return this.size === this.chunk;
    }
}

export default class Store {
    @observable currentUser = null;
    @observable downloads = [];

    constructor() {
        firebaseAPI.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }

    onAuthStateChanged(authData) {
        this.currentUser = authData && new User(authData);
        if (this.currentUser) {
            firebaseAPI.onDownloadAdded(this.currentUser.uid, this.onDownloadAdded);
        }
    }

    onDownloadAdded({url, size, chunk}) {
        this.downloads.push(new DownloadItem(url, size, chunk));
    }

    @computed get isLoggedIn() {
        return Boolean(this.currentUser);
    }

    @computed get downloadCount() {
        return this.downloads.length;
    }

    addDownload(url) {
        firebaseAPI.addDownload(this.currentUser.uid, url);
    }

    removeDownload(url) {
        const downloadItem = this.downloads.find(item => item.url === url);
        this.downloads.remove(downloadItem);
    }
}