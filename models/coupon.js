module.exports = (sequelize, Sequelize) => {
    const Coupon = sequelize.define('coupon', {
        couponId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.INTEGER,
        },
        redeemed: {
            type: Sequelize.BOOLEAN,
        },
        redeemBefore: {
            type: Sequelize.DATE,
        },
        redeemedDate: {
            type: Sequelize.DATE,
        },
    });

    return Coupon;
};
