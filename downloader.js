const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
const DOWNLOAD_FOLDER = 'downloads';
const mkdirp = require('mkdirp');

function extractFileName(url, response) {
    const contentDisposition = response.headers['content-disposition'];
    const match = contentDisposition && contentDisposition.match(/(filename=|filename\*='')(.*)$/);

    return (match && match[2]) || path.basename(url);
}

function download(urlToDownload, options = {}) {
    const requestFunc = url.parse(urlToDownload).protocol === 'http:' ? http : https;

    requestFunc.get(urlToDownload, response => {

        if (response.statusCode !== 200) {
            throw new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
        }

        mkdirp.sync(DOWNLOAD_FOLDER);

        const fileName = extractFileName(urlToDownload, response);
        const filePath = path.join(__dirname, `${DOWNLOAD_FOLDER}/${fileName}`);
        const destinationFileStream = fs.createWriteStream(filePath);

        response.pipe(destinationFileStream);

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

        response.on('error', e => console.log(`Got error: ${e.message}`));

    });
}

module.exports = download;