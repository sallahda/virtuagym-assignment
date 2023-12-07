const InvoiceLine = require('../models/invoiceLine');

/**
 * 
 * Basic CRUD operations for the Invoice Line model.
 */

exports.createInvoiceLine = async (req, res) => {
    const invoiceLine = await InvoiceLine.create(req.body);
    res.status(201).send(invoiceLine);
};

exports.getAllInvoiceLines = async (req, res) => {
    const invoiceLines = await InvoiceLine.findAll();
    res.send(invoiceLines);
};

exports.getInvoiceLineById = async (req, res) => {
    const invoiceLine = await InvoiceLine.findByPk(req.params.id);
    res.send(invoiceLine);
};

exports.updateInvoiceLine = async (req, res) => {
    const invoiceLine = await InvoiceLine.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.send(invoiceLine);
};

exports.deleteInvoiceLine = async (req, res) => {
    const invoiceLine = await InvoiceLine.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(204).send();
};
