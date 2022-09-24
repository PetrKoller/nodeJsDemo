const isPortReachable = require("is-port-reachable");
const dockerCompose = require("docker-compose");
const path = require("path");
// TODO VYEXPORTOVAT JAKO ASYNC ANONYMNI FUNKCI A VYTVORIT JEST.CONFIG.JS file, kde se da definovat globalSetup a globalTearDown viz. https://stackoverflow.com/questions/63138016/how-to-use-jest-global-setup-and-teardown-in-a-nodejs-project
const isDBReachable = await isPortReachable(27017);
if (!isDBReachable) {
    await dockerCompose.upAll({
        cwd: path.join(__dirname),
        log: true,
    });
}
