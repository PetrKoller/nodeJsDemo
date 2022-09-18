const express = require("express");
const util = require("util");
const { logger } = require("../../libraries/logger");
const productUseCase = require("../../domain/product-use-case");

function defineRoutes(expressApp) {
    const router = express.Router();

    router.get("/:id", async (req, res) => {
        logger.info(`Product API was called to get product by id ${req.params.id}`);
        const response = await productUseCase.getProduct(req.params.id);

        if (!response || response === null) {
            logger.debug(`Product ${req.params.id} not found`);
            res.status(404).end();
            return;
        }

        res.json(response);
    });

    router.post("/", async (req, res, next) => {
        try {
            logger.info(`Product API was called to create new product ${util.inspect(req.body)}`);
            const addProductResponse = await productUseCase.addProduct(req.body);
            return res.json(addProductResponse);
        } catch (error) {
            next(error);
            return undefined;
        }
    });

    router.delete("/:id", async (req, res) => {
        logger.info(`Product API was called to delete product with id ${req.params.id}`);
        const response = await productUseCase.deleteProduct(req.params.id);

        res.json(response);
    });

    expressApp.use("/test", router);
}

module.exports = defineRoutes;
