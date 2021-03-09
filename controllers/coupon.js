const db = require('../models');
const Coupon = db.coupons;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');

// Create and Save a new Coupon
exports.createOneCoupon = (req, res) => {
    // Validate request
    if (!req.body.userId) {
        res.status(400).send({
            message: 'userId(owner of the coupon) can not be empty!',
        });
        return;
    }

    // Create a Coupon
    const coupon = {
        couponId: uuidv4(),
        userId: req.body.userId,
        amount: req.body.amount,
        redeemed: false,
        redeemBefore: req.body.redeemBefore,
    };

    // Save Coupon in the database
    Coupon.create(coupon)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Coupon.',
            });
        });
};

// Retrieve all Coupons from the database.
exports.findAll = (req, res) => {
    Coupon.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving coupons.',
            });
        });
};

// Find a single Coupon with an couponId
exports.findOne = (req, res) => {
    const couponId = req.params.couponId;

    Coupon.findByPk(couponId)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Coupon with couponId=' + couponId,
                error: err,
            });
        });
};

// Update a Coupon by the couponId in the request
exports.update = (req, res) => {
    const couponId = req.params.couponId;

    Coupon.update(req.body, {
        where: { couponId: couponId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Coupon was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Coupon with couponId=${couponId}. Maybe Coupon was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Coupon with couponId=' + couponId,
            });
        });
};

// Delete a Coupon with the specified couponId in the request
exports.delete = (req, res) => {
    const couponId = req.params.couponId;

    Coupon.destroy({
        where: { couponId: couponId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Coupon was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Coupon with couponId=${couponId}. Maybe Coupon was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Coupon with couponId=' + couponId,
                error: err,
            });
        });
};

// Delete all Coupons from the database.
exports.deleteAll = (req, res) => {
    Coupon.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Coupons were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all coupons.',
            });
        });
};

// Find all redeemed Coupon
exports.findAllRedeemed = (req, res) => {
    Coupon.findAll({ where: { redeemed: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving redeemed.',
            });
        });
};

// Find all unredeemd Coupon
exports.findAllUnredeemed = (req, res) => {
    Coupon.findAll({ where: { redeemed: false } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving unredeemed.',
            });
        });
};
