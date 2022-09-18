const Product = require("./product-model");
const { logger } = require("../../libraries/logger");

async function addProduct(product) {
    logger.info(`Adding new product with id: ${product.id}`);
    await Product.create(product);

    return product;
}

async function getProduct(id) {
    logger.info(`Fetching product with id ${id}`);
    const product = await Product.findById(id);

    return product;
}

async function deleteProduct(id) {
    logger.info(`Deleting product with id ${id}`);
    const response = await Product.deleteOne({ _id: id });

    return response;
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
};
