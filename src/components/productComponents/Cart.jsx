import React, { useContext } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import TablePrice from "./TablePrice";
import TablePayment from "./TablePayment";

const Cart = () => {
  const { cart } = useContext(cartContext);

  return (
    <div className="cart w-100 d-flex align-items-center flex-column justify-content-between position-relative">
      {
        <>
          <div className="w-100 shopping-cart d-flex flex-column">
            <div className="position-relative table-container w-100">
              {!cart.length ? (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <h6 className="text-primary">Please choose product</h6>
                </div>
              ) : (
                <TablePrice />
              )}
            </div>
          </div>
          <div className="col w-75 h-50 m-0">
            <div className="total-payment position-relative p-2">
              <h5 className="header-title">Total Payment:</h5>
              <TablePayment />
              <button
                className=" position-absolute bottom-0 start-50 translate-middle-x bg-success text-white border-0 rounded-pill px-3 my-2"
                onClick={() => {
                  console.log(cart);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Cart;
