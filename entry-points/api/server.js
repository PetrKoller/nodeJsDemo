const express = require("express");
const defineRoutes = require("./routes").default;

let connection;

async function openConnection(expressApp) {
    return new Promise((resolve) => {
        const portToListen = 8080;

        connection = expressApp.listen(portToListen, () => {
            resolve(connection.address());
        });
    });
}

async function startWebServer() {
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
