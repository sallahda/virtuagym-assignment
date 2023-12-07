const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const Invoice = require('../models/invoice');
const InvoiceLine = require('../models/invoiceLine');
const Membership = require('../models/membership');


exports.checkIn = async (req, res) => {
  const { userId, requestId } = req.body;

  // Start a new transaction
  const t = await sequelize.transaction();

  try {
    let membership = await Membership.findOne({
      where: { userId },
      transaction: t
    });

    // Check if the user has a membership and if it's active
    if (!membership || membership.state === 'Canceled') {
      throw new Error('User does not have an active membership.');
    }

    // Check if the user has credits available and if the membership has not expired
    if (membership.credits <= 0 || new Date(membership.endDate) < new Date()) {
      throw new Error('No credits available or membership has ended.');
    }

    // Check for an existing check-in operation
    let existingInvoiceLine = await InvoiceLine.findOne({
      where: { requestId },
      transaction: t
    });

    if (existingInvoiceLine) {
      throw new Error('This check-in operation has already been processed.');
    }

    // Deduct 1 credit from the user's membership
    membership.credits -= 1;
    await membership.save({ transaction: t });

    // Create a new invoice for the month if it doesn't exist yet
    let invoice = await Invoice.findOne({
      where: {
        userId,
        date: {
          [Sequelize.Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          [Sequelize.Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
        }
      },
      transaction: t
    });

    if (!invoice) {
      invoice = await Invoice.create({
        userId,
        date: new Date(),
        status: 'Outstanding',
        description: 'Monthly invoice',
        amount: 0
      }, { transaction: t });
    }

    // Create a new invoice line for the check-in
    const invoiceLine = await InvoiceLine.create({
      invoiceId: invoice.id,
      requestId: requestId,
      amount: 10,
      description: 'Check-in at club'
    }, { transaction: t });

    // Update the total amount of the invoice
    invoice.amount += invoiceLine.amount;
    await invoice.save({ transaction: t });

    // Commit the transaction if everything goes well
    await t.commit();

    res.status(200).send({ message: 'Check-in successful.' });

  } catch (error) {
    // If there's an error, roll back the transaction
    await t.rollback();
    res.status(400).send({ message: error.message });
  }
};
