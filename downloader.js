const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const ProgressBar = require('progress');
const url = require('url');

module.exports = function download(urlToDownload) {
    const filename = path.basename(urlToDownload);
    const destinationFilePath = fs.createWriteStream(path.join(__dirname, `dist/${filename}`));
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

        response.on('end', () => console.log('done'));
    });
};