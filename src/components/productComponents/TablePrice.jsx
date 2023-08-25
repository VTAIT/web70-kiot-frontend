import React, { useContext, useEffect, useState } from "react";
import cartContext from "../../contexts/CartContext/CartContext";
import {
    caculatePromotionPrice,
    caculateTotalPrice,
} from "../../utils/cartUtils";
const TablePrice = () => {
    const { cart, changeQuantity } = useContext(cartContext);

    const [arrQuantity, setArrQuantity] = useState([]);

    const handleOnChange = (value, index) => {
        if (parseInt(value) >= 0 || value === "") {
            const updateQuantity = [...arrQuantity];
            updateQuantity[index] = value;
            setArrQuantity(updateQuantity);
        }
    };

    useEffect(() => {
        setArrQuantity(cart.map((el) => el.quantity));
    }, [cart]);

    return (
        <table className="table w-100 mb-0 h-50">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {cart.length === 0 ? (
                    <p>There are no products</p>
                ) : (
                    cart.map((el, index) => {
                        return (
                            <tr
                                className="align-items-center"
                                key={el.product.id}
                            >
                                <td>
                                    <div className="d-flex flex-column">
                                        <img
                                            src={el.product.image}
                                            alt={el.product.product_name}
                                        />
                                        <p className="d-inline-block align-middle mb-0">
                                            <a
                                                href
                                                className="d-inline-block align-middle mb-0 product-name"
                                            >
                                                {el.product.product_name}
                                            </a>
                                            <br />
                                        </p>
                                    </div>
                                </td>

                                <td>
                                    <input
                                        className="form-control w-50"
                                        type="number"
                                        value={arrQuantity[index]}
                                        onChange={(e) =>
                                            handleOnChange(
                                                e.target.value,
                                                index
                                            )
                                        }
                                        onBlur={(e) => {
                                            changeQuantity(
                                                el.product,
                                                arrQuantity[index]
                                            );
                                        }}
                                    />
                                    <div className="text-muted font-13 ">
                                        x $
                                        {caculatePromotionPrice(
                                            el.product.price,
                                            el.product.promotion_rate
                                        )}
                                    </div>
                                </td>

                                <td>
                                    $
                                    {caculateTotalPrice(
                                        caculatePromotionPrice(
                                            el.product.price,
                                            el.product.promotion_rate
                                        ),
                                        el.quantity
                                    )}
                                </td>

                                <td>
                                    <button
                                        onClick={() =>
                                            changeQuantity(el.product, 0)
                                        }
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
};

export default TablePrice;
