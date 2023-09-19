import React, { useContext, useState } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import TablePrice from "./TablePrice";
import TablePayment from "./TablePayment";
import PaymentModal from "./PaymentModal";

const Cart = () => {
  const { cart } = useContext(cartContext);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="cart w-100 d-flex align-items-center flex-column justify-content-between position-relative">
      <div className="w-100 shopping-cart scrollbar-small d-flex flex-column">
        <div className="position-relative table-container w-100">
          <TablePrice />
        </div>
      </div>
      <div
        className="col m-0 p-0"
        style={{ width: "70%", minWidth: "fit-content" }}
      >
        <div className="total-payment position-relative p-2">
          <h5 className="header-title">Total Payment:</h5>
          <TablePayment />

          <button
            className=" position-absolute bottom-0 start-50 translate-middle-x bg-success text-white border-0 rounded-pill px-3 my-2"
            onClick={() => {
              cart.length && setModalShow(true);
            }}
          >
            Accept
          </button>
        </div>
      </div>
      <PaymentModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Cart;
