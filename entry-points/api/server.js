const express = require("express");
const defineRoutes = require("./routes").default;
const configurationProvider = require("../../libraries/configuration-provider");
const configSchema = require("../../config").default;
const { logger } = require("../../libraries/logger");

let connection;

async function openConnection(expressApp) {
    return new Promise((resolve) => {
        const portToListen = configurationProvider.getValue("port");

        connection = expressApp.listen(portToListen, () => {
            resolve(connection.address());
        });
    });
}

async function startWebServer() {
    configurationProvider.init(configSchema);
    logger.configureLogger(configurationProvider.getValue("logger"), true);

    const expressApp = express();
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(express.json());
    defineRoutes(expressApp);

    const APIAddress = await openConnection(expressApp);
    return APIAddress;
}

async function stopWebServer() {
    return new Promise((resolve) => {
        if (connection !== undefined) {
            connection.close(() => {
                resolve();
            });
        }
    });
}

module.exports = {
    startWebServer,
    stopWebServer,
};
