const { startWebServer } = require("./entry-points/api/server");
const { logger } = require("./libraries/logger");

async function start() {
    return Promise.all([startWebServer()]);
}

start()
    .then((startResponses) => {
        logger.info(`App listening to ${startResponses[0].port}`);
        console.dir(startResponses, { depth: null });
    })
    .catch((error) => {
        logger.error(`Error during startup ${error}`);
    });
