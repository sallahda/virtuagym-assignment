const Invoice = require('../models/invoice');

/**
 * 
 * Basic CRUD operations for the Invoice model.
 */

exports.createInvoice = async (req, res) => {
    const invoice = await Invoice.create(req.body);
    res.status(201).send(invoice);
};

exports.getAllInvoices = async (req, res) => {
    const invoices = await Invoice.findAll();
    res.send(invoices);
};

exports.getInvoiceById = async (req, res) => {
    const invoice = await Invoice.findByPk(req.params.id);
    res.send(invoice);
};

exports.updateInvoice = async (req, res) => {
    const invoice = await Invoice.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.send(invoice);
};

exports.deleteInvoice = async (req, res) => {
    const invoice = await Invoice.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(204).send();
};
