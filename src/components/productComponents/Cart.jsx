import React, { useContext } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import TablePrice from "./TablePrice";
import TablePayment from "./TablePayment";

const Cart = () => {
    const { cart } = useContext(cartContext);
    return (
        <>
            <div className="cart w-100 d-flex align-items-center flex-column  justify-content-between">
                <div className="table-responsive w-100 shopping-cart d-flex flex-column">
                    <div className="table-container w-100">
                        <TablePrice />
                    </div>
                </div>
                <div className="col w-75 h-50 m-0">
                    <div className="total-payment position-relative p-2">
                        <h5 className="header-title">Total Payment:</h5>
                        <TablePayment />
                        <button
                            className=" position-absolute bottom-0 start-50 translate-middle-x bg-success text-white border-0 rounded-pill px-3 my-2"
                            onChange={() => {
                                console.log(cart);
                            }}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
