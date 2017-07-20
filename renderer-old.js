const { ipcRenderer } = require('electron');

const button = window.document.querySelector('#downloadBtn');
const inputElem = window.document.querySelector('#fileInput');
const progress = window.document.querySelector('#progress');

let total = 0;
let downloaded = 0;

button.addEventListener('click', () => {
    ipcRenderer.send('download-file', {
        fileUrl: inputElem.value
    });

    inputElem.value = '';
});


ipcRenderer.on('download-start', (event, props) => {
    total = props.total;
    downloaded = 0;
    progress.innerText = downloaded + '%';
});

ipcRenderer.on('download-on', (event, props) => {
    downloaded += props.chunk;
    progress.innerText = Math.floor(downloaded / total * 100) + '%';
});

ipcRenderer.on('download-end', () => {
    console.log('DONE');
});