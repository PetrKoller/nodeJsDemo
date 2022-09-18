const { v4: uuidv4 } = require("uuid");
const assertNewProductIsValid = require("./product-validators");
const productRepository = require("../data-access/repositories/product-repository");

async function addProduct(newProduct) {
    assertNewProductIsValid(newProduct);
    newProduct._id = uuidv4();

    return await productRepository.addProduct(newProduct);
}

async function getProduct(id) {
    return await productRepository.getProduct(id);
}

async function deleteProduct(id) {
    return await productRepository.deleteProduct(id);
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
};
