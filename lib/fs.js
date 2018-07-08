const fs = require('fs');

module.exports = {
    fsExists(path) {
        return new Promise(function (resolve, reject) {
            fs.exists(path, function (exists) {
                resolve(exists);
            });
        });
    },

    fsReadFile(path) {
        return new Promise(function (resolve, reject) {
            fs.readFile(path, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    fsMkdir(path) {
        return new Promise(function (resolve, reject) {
            fs.mkdir(path, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    fsWriteFile(path, data) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(path, data, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    fsUnlink(path) {
        return new Promise(function (resolve, reject) {
            fs.unlink(path, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },
};