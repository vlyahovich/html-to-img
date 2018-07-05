const fs = require('fs');

module.exports = {
    fileExists: (path) => {
        return new Promise(function (resolve, reject) {
            fs.exists(path, function (exists) {
                resolve(exists);
            });
        });
    },

    readFile: (path) => {
        return new Promise(function (resolve, reject) {
            fs.readFile(path, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
};