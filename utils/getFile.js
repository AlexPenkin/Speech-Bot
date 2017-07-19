const http = require('http');
const fs = require('fs');

const awiatinPipe = require('./awiatinPipe');

const getFile = (url, filePath) => new Promise((resolve, reject) => {
    http.get(url, async(response) => {
        let file = fs.createWriteStream(filePath);
        await awiatinPipe(response, file);
        resolve(file);
    });
})

module.exports = getFile;