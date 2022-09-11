const config = {
    port: {
        doc: "API listening port. By default 0 (dynamic)",
        format: "Number",
        default: 0,
        nullable: true,
        env: "PORT",
    },
    logger: {
        level: {
            doc: "Which type of logger entries should actually be written to the target medium (e.g., stdout)",
            format: ["debug", "info", "warn", "error", "critical"],
            default: "info",
            nullable: false,
            env: "LOGGER_LEVEL",
        },
        prettyPrint: {
            doc: "Weather the logger should be configured to pretty print the output",
            format: "Boolean",
            default: true,
            nullable: false,
            env: "PRETTY_PRINT_LOG",
        },
    },
};

module.exports = config;
