const productSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        price: { type: "number" },
        additionalInfo: { type: "string" },
    },
    required: ["name", "price"],
};

module.exports = productSchema;
