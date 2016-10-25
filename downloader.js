const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const ProgressBar = require('progress');
const firebase = require('firebase');
const url = require('url');
const config = require('./config');

firebase.initializeApp(config.firebse);

const downloadsRef = firebase.database().ref();

function downloadFile(snapshot) {
    const urlToDownload = snapshot.val();
    const key = snapshot.key;
    const filename = path.basename(urlToDownload);
    const destinationFilePath = fs.createWriteStream(path.join(__dirname, `${config.dist}/${filename}`));
    const requestFunc = url.parse(urlToDownload).protocol === 'http:' ? http : https;

    requestFunc.get(urlToDownload, response => {
        response.pipe(destinationFilePath);

        const bar = new ProgressBar(`downloading ${filename} [:bar] :percent :elapsed`, {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: parseInt(response.headers['content-length'], 10)
        });

        response.on('data', chunk => bar.tick(chunk.length));

        response.on('end', () => downloadsRef.child(key).remove());
    });
}

downloadsRef.on('child_added', downloadFile);