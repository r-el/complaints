const request = require('supertest');
const mongoose = require('mongoose');
const { app, startServer } = require('../app');
const Complaint = require('../models/complaint.model');

let server;

describe('Integration: delete complaints', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.ADMIN_PASSWORD = 'testpass';
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/complaints_test';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    server = await startServer();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (server) server.close();
  });

  afterEach(async () => {
    await Complaint.deleteMany({});
  });

  it('allows admin to delete a complaint', async () => {
    // Create a complaint first
    const complaint = await Complaint.create({
      category: 'food',
      message: 'Test complaint for deletion'
    });

    // Delete the complaint
    const res = await request(app)
      .delete(`/api/complaints/${complaint._id}?adminKey=testpass`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Complaint deleted successfully');

    // Verify complaint is deleted
    const deletedComplaint = await Complaint.findById(complaint._id);
    expect(deletedComplaint).toBeNull();
  });

  it('rejects delete request with wrong password', async () => {
    const complaint = await Complaint.create({
      category: 'food',
      message: 'Test complaint'
    });

    const res = await request(app)
      .delete(`/api/complaints/${complaint._id}?adminKey=wrongpass`);

    expect(res.status).toBe(403);
    
    // Verify complaint still exists
    const existingComplaint = await Complaint.findById(complaint._id);
    expect(existingComplaint).toBeTruthy();
  });

  it('returns 404 for non-existent complaint', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    
    const res = await request(app)
      .delete(`/api/complaints/${nonExistentId}?adminKey=testpass`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Complaint not found');
  });
});
