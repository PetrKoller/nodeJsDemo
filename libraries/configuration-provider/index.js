const convict = require("convict");

let convictConfigProvider;

function init(schema) {
    convictConfigProvider = convict(schema);
    convictConfigProvider.validate();
}

function reset() {
    convictConfigProvider = undefined;
}

function getValue(keyName) {
    if (convictConfigProvider === undefined) {
        throw new Error("Configuration has not been initialized");
    }

    return convictConfigProvider.get(keyName);
}

module.exports = {
    init,
    reset,
    getValue,
};
