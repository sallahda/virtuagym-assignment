const User = require('./user');
const Invoice = require('./invoice');
const Membership = require('./membership');
const InvoiceLine = require('./invoiceLine');

/**
 * 
 * All needed associations between models.
 */

User.hasOne(Membership, {
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
User.hasMany(Invoice, {
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});

Invoice.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'User'
  });

  Invoice.hasMany(InvoiceLine, {
    foreignKey: 'invoiceId',
    as: 'lines',
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
  });
  
  InvoiceLine.belongsTo(Invoice, {
    foreignKey: 'invoiceId',
    as: 'invoice',
  });
  