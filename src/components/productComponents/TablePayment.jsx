import React, { useContext } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import { caculateTotalPayment } from "../../utils/cartUtils";
import { productPropsContext } from "../productProviderComponents/ProductProvider";

const TablePayment = () => {
  const tax = 10;
  const { cart } = useContext(cartContext);
  const productProps = useContext(productPropsContext);
  return (
    <table className="table">
      <tbody>
        <tr>
          <td className="payment-title">Subtotal:</td>
          <td>
            {cart.length && <strong>${caculateTotalPayment(cart)}</strong>}
          </td>
        </tr>
        <tr>
          <td className="payment-title">Tax:</td>
          <td>
            {cart.length && (
              <strong>${(caculateTotalPayment(cart) * tax) / 100}</strong>
            )}
          </td>
        </tr>
        <tr>
          <td className="payment-title">Kiot discount:</td>
          <td>{cart.length && <strong> 0</strong>}</td>
        </tr>

        <tr>
          <td className="payment-title">Total</td>
          <td className="text-dark">
            {cart.length && (
              <strong>
                $
                {caculateTotalPayment(cart) +
                  (caculateTotalPayment(cart) * 10) / 100}
              </strong>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TablePayment;
