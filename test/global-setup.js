const dockerCompose = require("docker-compose");
const path = require("path");

module.exports = async () => {
    console.time("global-setup");

    dockerCompose
        .upAll({
            cwd: path.join(__dirname),
            log: true,
        })
        .then(
            () => {
                console.log("done");
            },
            (err) => {
                console.log("something went wrong:", err.message);
            }
        );
    console.timeEnd("global-setup");
};
