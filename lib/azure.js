const storage = require('azure-storage');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

function getService() {
    if (!this.blobService) {
        this.blobService = storage.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    }

    return this.blobService;
}

module.exports = {
    hasStorage() {
        return Boolean(AZURE_STORAGE_CONNECTION_STRING);
    },

    upload(blobName, path) {
        return new Promise((resolve, reject) => {
            getService().createBlockBlobFromLocalFile(AZURE_STORAGE_CONTAINER_NAME, blobName, path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Upload complete`);
                }
            });
        });
    },

    list() {
        return new Promise((resolve, reject) => {
            getService().listBlobsSegmented(AZURE_STORAGE_CONTAINER_NAME, null, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    properties(blobName) {
        return new Promise((resolve, reject) => {
            getService().getBlobProperties(AZURE_STORAGE_CONTAINER_NAME, blobName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
};