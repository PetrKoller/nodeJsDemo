const util = require("util");
const { logger } = require("../logger");

let httpServerRef;

class AppError extends Error {
    constructor(name, message, cause, HTTPStatus = 500, isTrusted = true) {
        super(message);
        this.name = name;
        this.message = message;
        this.HTTPStatus = HTTPStatus;
        this.isTrusted = isTrusted;
        this.cause = cause;
    }
}

function terminateHttpServer() {
    return new Promise((resolve) => {
        if (httpServerRef) {
            httpServerRef.close(() => {
                resolve();
            });
        } else {
            resolve();
        }
    });
}

const terminateHttpServerAndExit = () => {
    terminateHttpServer().then(process.exit());
};

const normalizeError = (errorToHandle) => {
    if (errorToHandle instanceof AppError) {
        return errorToHandle;
    }
    if (errorToHandle instanceof Error) {
        const appError = new AppError(errorToHandle.name, errorToHandle.message);
        appError.stack = errorToHandle.stack;
        return appError;
    }
    const inputType = typeof errorToHandle;
    return new AppError(
        "general-error",
        `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(
            errorToHandle
        )}`
    );
};

const errorHandler = {
    listenToErrorEvents: (httpServer) => {
        httpServerRef = httpServer;
        process.on("uncaughtException", (error) => {
            errorHandler.handleError(error);
        });

        process.on("unhandledRejection", (reason) => {
            errorHandler.handleError(reason);
        });

        process.on("SIGTERM", () => {
            logger.error("App received SIGTERM event, try to gracefully close the server");
            terminateHttpServerAndExit();
        });
        process.on("SIGINT", async () => {
            logger.error("App received SIGINT event, try to gracefully close the server");
            terminateHttpServerAndExit();
        });
    },

    handleError: (errorToHandle) => {
        try {
            const appError = normalizeError(errorToHandle);
            logger.error(appError);

            if (!appError.isTrusted) {
                logger.error("Terminating server due to untrusted error");
                terminateHttpServerAndExit();
            }
        } catch (handlingError) {
            process.stdout.write(
                "The error handler failed, here are the handler failure and then the origin error that it tried to handle"
            );
            process.stdout.write(JSON.stringify(handlingError));
            process.stdout.write(JSON.stringify(errorToHandle));
        }
    },
};

module.exports = {
    errorHandler,
    AppError,
};
