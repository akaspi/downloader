import * as firebase from 'firebase';

function init() {}

function onAuthStateChanged(cb) {
    firebase.auth().onAuthStateChanged(cb);
}

function onDownloadAdded(uid, cb) {
    firebase.database().ref(`${uid}/downloads`).on('child_added', snapshot => cb(snapshot.val()));
}

function addDownload(uid, url) {
    const uniqueKey = firebase.database().ref(`${uid}/downloads`);
    firebase.database().ref(`${uid}/downloads/${uniqueKey}`).set({
        url,
        size: 0,
        chunk: 0
    });
}

export {
    init,
    onAuthStateChanged,
    onDownloadAdded,
    addDownload
}