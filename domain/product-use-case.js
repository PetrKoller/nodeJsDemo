const assertNewProductIsValid = require("./product-validators");

async function addProduct(newProduct) {
    assertNewProductIsValid(newProduct);
    console.dir(newProduct);

    return "yep";
}

module.exports = { addProduct };
