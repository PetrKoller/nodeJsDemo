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

const terminateHttpServerAndExit = async () => {
    if (httpServerRef) {
        await httpServerRef.close();
    }
    process.exit();
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
        process.on("uncaughtException", async (error) => {
            await errorHandler.handleError(error);
        });

        process.on("unhandledRejection", async (reason) => {
            await errorHandler.handleError(reason);
        });

        process.on("SIGTERM", async () => {
            logger.error("App received SIGTERM event, try to gracefully close the server");
            await terminateHttpServerAndExit();
        });
        process.on("SIGINT", async () => {
            logger.error("App received SIGINT event, try to gracefully close the server");
            await terminateHttpServerAndExit();
        });
    },

    handleError: async (errorToHandle) => {
        try {
            const appError = normalizeError(errorToHandle);
            logger.error(appError.message, appError);

            if (!appError.isTrusted) {
                await terminateHttpServerAndExit();
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
