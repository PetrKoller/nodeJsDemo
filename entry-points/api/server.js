const path = require("path");
const dockerCompose = require("docker-compose");
const express = require("express");
const defineRoutes = require("./routes");
const configurationProvider = require("../../libraries/configuration-provider");
const configSchema = require("../../config");
const { logger } = require("../../libraries/logger");
const { errorHandler } = require("../../libraries/error-handling");
const connectToDB = require("../../data-access/db-connection");

let connection;

async function openConnection(expressApp) {
    return new Promise((resolve) => {
        const portToListen = configurationProvider.getValue("port");

        connection = expressApp.listen(portToListen, () => {
            errorHandler.listenToErrorEvents(connection);
            resolve(connection.address());
        });
    });
}

function handleRouteErrors(expressApp) {
    expressApp.use(
        async (
            error,
            req,
            res,
            // eslint-disable-next-line
            next
        ) => {
            if (error && typeof error === "object") {
                if (error.isTrusted === undefined || error.isTrusted === null) {
                    error.isTrusted = true;
                }
            }

            errorHandler.handleError(error);
            res.status(error?.HTTPStatus || 500).end();
        }
    );
}

async function startWebServer() {
    configurationProvider.init(configSchema);
    logger.configureLogger(configurationProvider.getValue("logger"), true);

    await connectToDB(configurationProvider.getValue("DB.connectionString"));

    const expressApp = express();
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(express.json());
    defineRoutes(expressApp);
    handleRouteErrors(expressApp);

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
