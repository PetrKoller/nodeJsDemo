const express = require("express");

exports.default = (expressApp) => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        res.json("bar");
    });

    expressApp.use("/test", router);
};
