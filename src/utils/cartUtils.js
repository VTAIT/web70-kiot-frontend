const caculatePromotionPrice = (price, promotion_rate) => {
    const PromotionPrice = (price - (price * promotion_rate) / 100).toFixed(2);
    return parseInt(PromotionPrice);
};

const caculateTotalPrice = (promotionPrice, quantity) => {
    const total = promotionPrice * quantity;
    return parseInt(total);
};

const caculateTotalPayment = (cart) => {
    let totalPayment = 0;
    cart.forEach((el) => {
        totalPayment =
            totalPayment +
            caculateTotalPrice(
                caculatePromotionPrice(el.product.price, el.saleOff),
                el.quantity
            );
    });
    return parseInt(totalPayment);
};

export { caculatePromotionPrice, caculateTotalPrice, caculateTotalPayment };
