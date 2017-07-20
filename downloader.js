const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

module.exports = function download(urlToDownload, options = {}) {
    const filename = path.basename(urlToDownload);
    const destinationFilePath = fs.createWriteStream(path.join(__dirname, `dist/${filename}`));
    const requestFunc = url.parse(urlToDownload).protocol === 'http:' ? http : https;

    requestFunc.get(urlToDownload, response => {

        response.pipe(destinationFilePath);

        if (typeof options.start === 'function') {
            options.start({
                total: parseInt(response.headers['content-length'], 10)
            });
        }

        if (typeof options.on === 'function') {
            response.on('data', chunk => options.on({
                chunk: chunk.length
            }));
        }

        if (typeof options.end === 'function') {
            response.on('end', () => options.end());
        }

    });
};