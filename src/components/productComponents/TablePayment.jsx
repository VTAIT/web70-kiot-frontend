import React, { useContext } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import {
  caculateTax,
  caculateTotalPayment,
  caculateTotalPaymentAfterTax,
} from "../../utils/cartUtils";

const TablePayment = () => {
  const { cart } = useContext(cartContext);

  return (
    <div className="d-flex">
      <table className="table">
        <tbody>
          <tr>
            <td className="payment-title">Order Total:</td>
            <td>
              {cart.length && <strong>${caculateTotalPayment(cart)}</strong>}
            </td>
            <td className="payment-title">Tax:</td>
            <td>{cart.length && <strong>${caculateTax(cart)}</strong>}</td>
          </tr>
          <tr>
            <td className="payment-title">Subtotal</td>
            <td className="text-dark">
              {cart.length && (
                <strong>${caculateTotalPaymentAfterTax(cart)}</strong>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePayment;
