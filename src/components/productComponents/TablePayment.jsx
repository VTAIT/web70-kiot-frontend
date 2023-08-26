import React, { useContext } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import { caculateTotalPayment } from "../../utils/cartUtils";

const TablePayment = () => {
    const { cart } = useContext(cartContext);
    return (
        <table className="table">
            <tbody>
                <tr>
                    <td className="payment-title">Subtotal:</td>
                    <td>${caculateTotalPayment(cart)}</td>
                </tr>
                <tr>
                    <td className="payment-title">Tax:</td>
                    <td>
                        <strong>
                            ${(caculateTotalPayment(cart) * 10) / 100}
                        </strong>
                    </td>
                </tr>

                <tr>
                    <td className="payment-title">Total</td>
                    <td className="text-dark">
                        <strong>
                            $
                            {caculateTotalPayment(cart) +
                                (caculateTotalPayment(cart) * 10) / 100}
                        </strong>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default TablePayment;
