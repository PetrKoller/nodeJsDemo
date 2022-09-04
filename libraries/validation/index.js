const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

// Exporting instance => singleton pattern, important for caching schemas
exports.default = ajv;
