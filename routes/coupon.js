module.exports = (app) => {
    const coupons = require('../controllers/coupon.js');

    const router = require('express').Router();

    // Create a new Coupon
    router.post('/', coupons.createOneCoupon);

    // Retrieve all Coupons
    router.get('/', coupons.findAll);

    // Retrieve all redeemed Coupons
    router.get('/redeemed', coupons.findAllRedeemed);

    // Retrieve all unredeeme Coupons
    router.get('/unredeemed', coupons.findAllUnredeemed);

    // Retrieve a single Coupon with couponId
    router.get('/:couponId', coupons.findOne);

    // Update a Coupon with couponId
    router.put('/:couponId', coupons.update);

    // Delete a Coupon with couponId
    router.delete('/:couponId', coupons.delete);

    // Delete all Coupon
    router.delete('/', coupons.deleteAll);

    app.use('/api/tutorials', router);
};
