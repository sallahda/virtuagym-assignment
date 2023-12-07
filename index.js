const express = require('express');
const bodyParser = require('body-parser');

const invoiceRoutes = require('./routes/invoiceRoutes');
const invoiceLineRoutes = require('./routes/invoiceLineRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const checkInController = require('./controllers/checkInController');

/**
 * Main server of the application, defines the Express.js application.
 */

const app = express();
app.use(bodyParser.json());

app.use('/invoices', invoiceRoutes);
app.use('/invoice-lines', invoiceLineRoutes);
app.use('/memberships', membershipRoutes);

app.post('/check-in', checkInController.checkIn);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('Server is running'));
}

module.exports = app;
