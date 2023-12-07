const express = require('express');
const router = express.Router();

const invoiceLineController = require('../controllers/invoiceLineController');

/**
 * 
 * Basic CRUD routes for the Invoice line controller.
 */

router.post('/', invoiceLineController.createInvoiceLine);
router.get('/', invoiceLineController.getAllInvoiceLines);
router.get('/:id', invoiceLineController.getInvoiceLineById);
router.put('/:id', invoiceLineController.updateInvoiceLine);
router.delete('/:id', invoiceLineController.deleteInvoiceLine);

module.exports = router;
