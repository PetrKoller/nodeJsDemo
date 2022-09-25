const mongoose = require("mongoose");
const { AppError, errorHandler } = require("../libraries/error-handling");
const { logger } = require("../libraries/logger");

async function connectToDB(connectionString) {
    try {
        logger.info("Connecting to DB");
        await mongoose.connect(connectionString);
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
