const sequelize = require('../config/connection');
const User = require('../models/user');
const Invoice = require('../models/invoice');
const InvoiceLine = require('../models/invoiceLine');
const Membership = require('../models/membership');
const { v4: uuidv4 } = require('uuid');

sequelize.sync();

async function insertMockData() {
    // Create a new user
    const user = await User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
  
    // Create a new membership for the user
    const membership = await Membership.create({
      userId: user.id,
      startDate: new Date(),
      endDate: new Date((new Date()).setMonth((new Date()).getMonth() + 1)),
      credits: 10,
      state: 'Active'
    });
  
    // Create a new invoice for the user
    const invoice = await Invoice.create({
      userId: user.id,
      date: new Date(),
      status: 'Outstanding',
      description: 'Monthly invoice',
      amount: 0
    });
  
    // Create a new invoice line
    const invoiceLine = await InvoiceLine.create({
      invoiceId: invoice.id,
      requestId: uuidv4(),
      amount: 10,
      description: 'Check-in at club'
    });
  
    console.log('Mock data inserted successfully.');
}
  
insertMockData().catch(console.error);
