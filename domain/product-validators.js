const ajv = require("../libraries/validation");
const productSchema = require("./product-schema");
const { AppError } = require("../libraries/error-handling");

function assertNewProductIsValid(newProduct) {
    let validateProduct = ajv.getSchema("new-product");

    if (!validateProduct) {
        ajv.addSchema(productSchema, "new-product");
        validateProduct = ajv.getSchema("new-product");
    }

    if (validateProduct === undefined) {
        throw new AppError(
            "unpredictable-validation-failure",
            "An internal validation error occurred where schemas cant be obtained",
            "validator",
            500,
            false
        );
    }

    if (!validateProduct(newProduct)) {
        throw new AppError(
            "invalid-order",
            "Validation failed",
            "Invalid order from user input",
            400,
            true
        );
    }
}

module.exports = assertNewProductIsValid;
