const express = require("express");
const productUseCase = require("../../domain/product-use-case");

function defineRoutes(expressApp) {
    const router = express.Router();

    router.get("/", async (req, res) => {
        res.json("bar");
    });

    router.post("/", async (req, res, next) => {
        try {
            const addNewProductResponse = await productUseCase.addProduct(req.body);
            return res.json(addNewProductResponse);
        } catch (error) {
            next(error);
            return undefined;
        }
    });

    expressApp.use("/test", router);
}

module.exports = defineRoutes;
