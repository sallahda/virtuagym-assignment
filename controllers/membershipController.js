const Membership = require('../models/membership');

/**
 * 
 * Basic CRUD operations for the Membership model.
 */

exports.createMembership = async (req, res) => {
    const membership = await Membership.create(req.body);
    res.status(201).send(membership);
};

exports.getAllMemberships = async (req, res) => {
    const memberships = await Membership.findAll();
    res.send(memberships);
};

exports.getMembershipById = async (req, res) => {
    const membership = await Membership.findByPk(req.params.id);
    res.send(membership);
};

exports.updateMembership = async (req, res) => {
    const membership = await Membership.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.send(membership);
};

exports.deleteMembership = async (req, res) => {
    const membership = await Membership.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(204).send();
};
