const ajv = require("../libraries/validation").default;
const { productSchema } = require("./product-schema");

function assertNewProductIsValid(newProduct) {
    let validateProduct = ajv.getSchema("new-product");

    if (!validateProduct) {
        ajv.addSchema(productSchema, "new-product");
        validateProduct = ajv.getSchema("new-product");
    }

    if (validateProduct === undefined) {
        throw new Error("Invalid new product schema");
    }

    if (!validateProduct(newProduct)) {
        throw new Error("Invalid product, validatoin failed");
    }
}

module.exports = assertNewProductIsValid;
