import React, { useState } from "react";
import cartContext from "./CartContext";

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addProduct = (product, saleOff = 0, quantity = 1) => {
        const existProduct = cart.find((el) => el.product._id === product._id);
        if (!existProduct) {
            setCart((pre) => [
                ...pre,
                {
                    product,
                    quantity: parseInt(quantity),
                    saleOff,
                },
            ]);
        }
    };

    const changeQuantity = (product, quantity) => {
        if (parseInt(quantity) <= 0 || !quantity) {
            const termCart = cart.filter(
                (el) => el.product._id !== product._id
            );
            return setCart(termCart);
        }

        let updateCart = [...cart];
        const productIndex = updateCart.findIndex(
            (el) => el.product._id === product._id
        );

        updateCart[productIndex] = {
            ...updateCart[productIndex],
            quantity: parseInt(quantity),
        };

        return setCart(updateCart);
    };

    return (
        <cartContext.Provider
            value={{
                cart,
                addProduct,
                changeQuantity,
            }}
        >
            {children}
        </cartContext.Provider>
    );
};

export default CartProvider;
