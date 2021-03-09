module.exports = (sequelize, Sequelize) => {
    const Coupon = sequelize.define('coupon', {
        couponId: {
            type: Sequelize.STRING,
            primaryKey: true,
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
