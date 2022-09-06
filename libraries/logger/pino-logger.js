const pino = require("pino");

class PinoLogger {
    constructor(level, prettyPrintEnabled) {
        this.level = level;
        this.prettyPrintEnabled = prettyPrintEnabled;
        const opts = {
            level: this.level,
            transport: this.prettyPrintEnabled
                ? {
                      target: "pino-pretty",
                      options: {
                          colorize: true,
                          sync: true,
                      },
                  }
                : undefined,
        };
        this.logger = pino(opts);
    }

    debug(message, ...args) {
        this.logger.debug(message, ...args);
    }

    error(message, ...args) {
        this.logger.error(message, ...args);
    }

    info(message, ...args) {
        this.logger.info(message, ...args);
    }

    warn(message, ...args) {
        this.logger.warn(message, ...args);
    }
}

module.exports = PinoLogger;
