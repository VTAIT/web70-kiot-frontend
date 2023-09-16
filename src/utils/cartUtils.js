const tax = 10;

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

const caculateTax = (cart) => {
  const Tax = (caculateTotalPayment(cart) * tax) / 100;

  return Tax;
};

const caculateTotalPaymentAfterTax = (cart) => {
  const afterTax = caculateTotalPayment(cart) + caculateTax(cart);
  return afterTax;
};
const caculateTotalPaymentWithSaleOff = (cart, rate) => {
  const afterSaleOff =
    caculateTotalPaymentAfterTax(cart) -
    (caculateTotalPaymentAfterTax(cart) * rate) / 100;
  return afterSaleOff;
};

const handleFormatCart = (cart) => {
  const newCart = cart.map((el) => {
    const newel = {
      name: el.product.name_product,
      value: el.product.price * el.quantity,
    };
    return newel;
  });
  return newCart;
};

export {
  caculatePromotionPrice,
  caculateTotalPrice,
  caculateTotalPayment,
  caculateTax,
  caculateTotalPaymentAfterTax,
  caculateTotalPaymentWithSaleOff,
  handleFormatCart,
};
