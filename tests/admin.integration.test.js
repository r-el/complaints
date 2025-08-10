const request = require("supertest");
const mongoose = require("mongoose");
const { app, startServer } = require("../app");

let server;

describe("Integration: admin access", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    process.env.ADMIN_PASSWORD = "testpass";
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/complaints_test";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server = await startServer();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (server) server.close();
  });

  it("rejects admin data fetch with wrong password", async () => {
    const res = await request(app).get("/api/complaints?adminKey=wrong");
    expect(res.status).toBe(403);
  });

  it("allows admin data fetch with correct password", async () => {
    // Insert a complaint directly
    await mongoose.connection.collection("complaints").insertOne({
      category: "food",
      message: "Test complaint",
      createdAt: new Date(),
    });

    const res = await request(app).get("/api/complaints?adminKey=testpass");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
