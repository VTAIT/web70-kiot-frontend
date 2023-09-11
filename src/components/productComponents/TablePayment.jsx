import React, { useContext } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import { caculateTotalPayment } from "../../utils/cartUtils";
import { productPropsContext } from "../productProviderComponents/ProductProvider";

const TablePayment = () => {
  const tax = 10;
  const { cart } = useContext(cartContext);
  const productProps = useContext(productPropsContext);
  return (
    <div className="d-flex">
      <table className="table">
        <tbody>
          <tr>
            <td className="payment-title">Subtotal:</td>
            <td>
              {cart.length && <strong>${caculateTotalPayment(cart)}</strong>}
            </td>
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

          <tr>
            <td className="payment-title">Coupon:</td>
            <td>
              <input className="w-100" type="text" />
            </td>
            <td className="payment-title">Paid:</td>
            <td>
              <input className="w-100" type="number" />
            </td>
          </tr>
          <tr>
            <td className="payment-title"> </td>
            <td>{cart.length && <strong> 0</strong>}</td>
            <td className="payment-title">Change:</td>
            <td>{cart.length && <strong>0</strong>}</td>
          </tr>
          <tr>
            <td className="payment-title">Tax:</td>
            <td>
              {cart.length && (
                <strong>${(caculateTotalPayment(cart) * tax) / 100}</strong>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePayment;
