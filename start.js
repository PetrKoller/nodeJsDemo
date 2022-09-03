const { startWebServer } = require("./entry-points/api/server");

async function start() {
    return Promise.all([startWebServer()]);
}

start()
    .then((startResponses) => {
        console.log(`Spoustim aplikaci na portu ${startResponses[0].port}`);
        console.dir(startResponses, { depth: null });
    })
    .catch((error) => {
        console.log(`Nastala chyba ${error}`);
    });
