const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Complaint = require("../models/complaint.model");

jest.setTimeout(30000); // Allow enough time for in-memory server startup

describe("Complaint model", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: "complaints_test" });
  });

  afterEach(async () => {
    await Complaint.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) await mongoServer.stop();
  });

  it("creates a complaint with required fields", async () => {
    const complaint = await Complaint.create({
      category: "food",
      message: "No milk",
    });
    expect(complaint._id).toBeDefined();
    expect(complaint.category).toBe("food");
    expect(complaint.message).toBe("No milk");
    expect(complaint.createdAt).toBeInstanceOf(Date);
  });

  it("fails without required fields", async () => {
    await expect(Complaint.create({ category: "food" })).rejects.toBeDefined();
  });
});
