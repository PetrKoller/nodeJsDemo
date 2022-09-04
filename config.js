exports.default = {
    port: {
        doc: "API listening port. By default 0 (dynamic)",
        format: "Number",
        default: 0,
        nullable: true,
        env: "PORT",
    },
};
