const path = require("path");
const dockerCompose = require("docker-compose");

module.exports = async () => {
    await dockerCompose.down({ cwd: path.join(__dirname), log: true });
};
