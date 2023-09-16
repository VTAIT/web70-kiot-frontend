import React, { useContext, useState } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import TablePrice from "./TablePrice";
import TablePayment from "./TablePayment";
import PaymentModal from "./PaymentModal";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const Cart = () => {
  const { cart } = useContext(cartContext);
  const { auth } = useContext(AuthContext);

  const [transaction, setTransaction] = useState({
    username: auth.user.username,
    kiot_id: auth.user.kiot_id || "",
    status: 4,
    deposit: "",
    returnV: "",
    retrun_list: [],
    product_list: cart,
    value: "",
  });

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="cart w-100 d-flex align-items-center flex-column justify-content-between position-relative">
      <div className="w-100 shopping-cart d-flex flex-column">
        <div className="position-relative table-container w-100">
          {!cart.length ? (
            <div className="position-absolute top-50 start-50 translate-middle">
              <h6 className="text-primary text-center">
                Please choose product
              </h6>
            </div>
          ) : (
            <TablePrice />
          )}
        </div>
      </div>
      <div className="col m-0 p-0 w-75">
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
