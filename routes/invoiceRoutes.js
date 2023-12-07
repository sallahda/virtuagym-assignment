const express = require('express');
const router = express.Router();

const invoiceController = require('../controllers/invoiceController');

/**
 * 
 * Basic CRUD routes for the Invoice controller.
 */

router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.getAllInvoices);
router.get('/:id', invoiceController.getInvoiceById);
router.put('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
