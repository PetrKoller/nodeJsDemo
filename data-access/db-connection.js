const mongoose = require("mongoose");
const { AppError, errorHandler } = require("../libraries/error-handling");
const { logger } = require("../libraries/logger");

function registerErrorListeners() {
    mongoose.connection.on("error", (err) => {
        errorHandler.handleError(
            new AppError("mongodb-error", "MongoDB emitted error", err, 500, false)
        );
    });

    // TODO Poresit, pri skonceni testu killnu mongo, coz zavola tenhle event a dojde k vyvolani erroru, ktery hazi process.exit called with ""
    mongoose.connection.on("disconnected", (err) => {
        errorHandler.handleError(
            new AppError("mogodb-disconnected-error", "Lost connection to MongoDB", err, 500, false)
        );
    });
}

async function connectToDB(connectionString) {
    try {
        logger.info("Connecting to DB");
        await mongoose.connect(connectionString);
        registerErrorListeners();
        logger.info("Successfully connected to DB");
    } catch (err) {
        errorHandler.handleError(
            new AppError(
                "mongodb-initialize-connection",
                "Unable to initialize connection with MongoDB",
                err,
                500,
                false
            )
        );
    }
}

module.exports = connectToDB;
