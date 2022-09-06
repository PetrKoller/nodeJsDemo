const PinoLogger = require("./pino-logger");

class LoggerWrapper {
    constructor() {
        this.underlyingLogger = null;
    }

    configureLogger(configuration, overrideIfExists = true) {
        if (this.underlyingLogger === null || overrideIfExists === true) {
            this.underlyingLogger = new PinoLogger(
                configuration.level || "info",
                configuration.prettyPrint || false
            );
        }
    }

    resetLogger() {
        this.underlyingLogger = null;
    }

    debug(message, ...args) {
        this.configureLogger({}, false);
        this.underlyingLogger.debug(message, args);
    }

    error(message, ...args) {
        this.configureLogger({}, false);
        this.underlyingLogger.error(message, args);
    }

    info(message, ...args) {
        this.configureLogger({}, false);
        this.underlyingLogger.info(message, args);
    }

    warn(message, ...args) {
        this.configureLogger({}, false);
        this.underlyingLogger.warn(message, args);
    }
}

const logger = new LoggerWrapper();

module.exports = {
    LoggerWrapper,
    logger,
};
