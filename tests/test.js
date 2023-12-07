const request = require('supertest');
const app = require('../index');
const sequelize = require('../config/connection');

const Invoice = require('../models/invoice');
const InvoiceLine = require('../models/invoiceLine');
const Membership = require('../models/membership');
const checkInController = require('../controllers/checkInController');

// Mocking Sequelize models
jest.mock('../models/invoice');
jest.mock('../models/invoiceLine');
jest.mock('../models/membership');

describe('Check In Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create invoice line and deduct credit when user checks in', async () => {
    Membership.findOne.mockResolvedValueOnce({
      credits: 10,
      state: 'Active',
      save: jest.fn().mockResolvedValueOnce(),
    });
  
    InvoiceLine.findOne.mockResolvedValueOnce(null);
    Invoice.findOne.mockResolvedValueOnce({
      amount: 0,
      save: jest.fn().mockResolvedValueOnce(),
    });
  
    // Add the following line to mock InvoiceLine.create
    InvoiceLine.create = jest.fn().mockResolvedValue({
      id: 1,
      invoiceId: 1,
      amount: 10,
      description: 'Check-in at club',
      requestId: '123',
      save: jest.fn().mockResolvedValueOnce(),
    });
  
    const response = await request(app)
    .post('/check-in')
    .send({
      userId: 1,
      requestId: '123',
    });
    
    expect(response.status).toBe(200);
  
    expect(Membership.findOne).toHaveBeenCalled();
    expect(InvoiceLine.findOne).toHaveBeenCalled();
    expect(Invoice.findOne).toHaveBeenCalled();
    expect(InvoiceLine.create).toHaveBeenCalled();  
  });
  

  it('should not allow check in if membership is cancelled or credits are zero', async () => {
    Membership.findOne.mockResolvedValueOnce({
      credits: 0,
      state: 'Canceled',
    });

    await request(app)
      .post('/check-in')
      .send({
        userId: 1,
        requestId: '123',
      })
      .expect(400);
  });

  it('should not allow check in if no credits available or membership has ended', async () => {
    Membership.findOne.mockResolvedValueOnce({
      credits: 0,
      endDate: new Date(2022, 1, 1),
      state: 'Active',
    });

    await request(app)
      .post('/check-in')
      .send({
        userId: 1,
        requestId: '123',
      })
      .expect(400);
  });

  it('should throw error if a checkin operation has already been processed', async () => {
    Membership.findOne.mockResolvedValueOnce({
      credits: 10,
      state: 'Active',
      save: jest.fn().mockResolvedValueOnce(),
    });

    InvoiceLine.findOne.mockResolvedValueOnce({ requestId: '123' });

    await request(app)
      .post('/check-in')
      .send({
        userId: 1,
        requestId: '123',
      })
      .expect(400);
  });

  it('should handle errors when fetching membership', async () => {
    Membership.findOne.mockImplementation(() => {
      throw new Error('Database error');
    });
  
    const response = await request(app)
      .post('/check-in')
      .send({
        userId: 1,
        requestId: '123',
      });
  
    expect(response.status).toBe(400);
  });
  
  it('should handle errors when creating invoice line', async () => {
    Membership.findOne.mockResolvedValueOnce({
      credits: 10,
      state: 'Active',
      save: jest.fn().mockResolvedValueOnce(),
    });
  
    InvoiceLine.findOne.mockResolvedValueOnce(null);
    InvoiceLine.create.mockImplementation(() => {
      throw new Error('Database error');
    });
  
    const response = await request(app)
      .post('/check-in')
      .send({
        userId: 1,
        requestId: '123',
      });
  
    expect(response.status).toBe(400);
  });
  
  it('should handle errors when fetching invoice', async () => {
    Membership.findOne.mockResolvedValueOnce({
      credits: 10,
      state: 'Active',
      save: jest.fn().mockResolvedValueOnce(),
    });
  
    InvoiceLine.findOne.mockResolvedValueOnce(null);
    Invoice.findOne.mockImplementation(() => {
      throw new Error('Database error');
    });
  
    const response = await request(app)
      .post('/check-in')
      .send({
        userId: 1,
        requestId: '123',
      });
  
    expect(response.status).toBe(400);
  });
  
  it('should return 400 if userId is not provided', async () => {
    const response = await request(app)
      .post('/check-in')
      .send({
        requestId: '123',
      });
  
    expect(response.status).toBe(400);
  });
  
  it('should return 400 if requestId is not provided', async () => {
    const response = await request(app)
      .post('/check-in')
      .send({
        userId: 1,
      });
  
    expect(response.status).toBe(400);
  });
  
  it('should not allow check in if membership end date is reached', async () => {
    Membership.findOne.mockResolvedValueOnce({
      credits: 10,
      endDate: new Date(Date.now() - 8640000),
      state: 'Active',
    });
  
    const response = await request(app)
      .post('/check-in')
      .send({
        userId: 1,
        requestId: '123',
      });
  
    expect(response.status).toBe(400);
  });
  
  it('should not allow a second check in with the same request ID', async () => {
    Membership.findOne.mockResolvedValueOnce({
      credits: 10,
      state: 'Active',
      save: jest.fn().mockResolvedValueOnce(),
    });
  
    InvoiceLine.findOne.mockResolvedValueOnce({ requestId: '123' });
  
    const response = await request(app)
      .post('/check-in')
      .send({
        userId: 1,
        requestId: '123',
      });
  
    expect(response.status).toBe(400);
  });
  
  
});
