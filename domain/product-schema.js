const productSchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        price: { type: "number" },
        addtionalInfo: { type: "string" },
    },
    required: ["name", "price"],
};

module.exports = productSchema;
