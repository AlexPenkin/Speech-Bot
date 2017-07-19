const awiatinPipe = async(stream, pipeTo) => {
    return new Promise((resolve, reject) => {
        stream.pipe(pipeTo);
        pipeTo.on('finish', () => {
            resolve('finish');
        })
        pipeTo.on('error', (e) => reject(e))
    })
}

module.exports = awiatinPipe;