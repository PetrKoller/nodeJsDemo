const axios = require("axios");
const sinon = require("sinon");
const nock = require("nock");
const { startWebServer, stopWebServer } = require("../entry-points/api/server");

let axiosAPIClient;

beforeAll(async () => {
    const apiConnection = await startWebServer();

    const axiosConfig = {
        baseURL: `http://127.0.0.1:${apiConnection.port}`,
        validateStatus: () => true, // Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
    };
    axiosAPIClient = axios.create(axiosConfig);

    nock.disableNetConnect();
    nock.enableNetConnect("127.0.0.1");
});

beforeEach(() => {
    // ️️️✅ Best Practice: Start each test with a clean slate
    nock.cleanAll();
    sinon.restore();
});

afterAll(async () => {
    nock.enableNetConnect();
    await stopWebServer();
});

describe("/api", () => {
    describe("POST /test", () => {
        test("When adding a new valid product, 200 http response should be returned", async () => {
            // Arrange
            const productToAdd = {
                name: "JIM",
                price: 50000,
                additionalInfo: "WE GO JIM",
            };

            // Act
            const receivedAPIResponse = await axiosAPIClient.post("/test", productToAdd);

            // Assert
            expect(receivedAPIResponse).toMatchObject({
                status: 200,
            });
        });
    });
});
