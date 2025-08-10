const request = require("supertest");
const mongoose = require("mongoose");
const { app, startServer } = require("../app");

let server;

describe("Integration: submit complaint", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/complaints_test";
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    server = await startServer();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (server) server.close();
  });

  it("POST /submit stores a complaint and redirects", async () => {
    const res = await request(app)
      .post("/submit")
      .send("category=food&message=Cold+food")
      .set("Content-Type", "application/x-www-form-urlencoded");

    expect(res.status).toBe(302); // redirect
    expect(res.headers.location).toBe("/");
  });
});
