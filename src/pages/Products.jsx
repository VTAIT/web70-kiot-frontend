import React from "react";
import CartProvider from "../contexts/CartContext/CartProvider";
import Cart from "../components/productComponents/Cart";
import SearchAndPaginaton from "../components/searchComponents/SearchAndPaginaton";
import ProductRender from "../components/productComponents/ProductRender";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const Products = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <CartProvider>
            <div className="page-content">
                <div className="container-fluid product-container">
                    <SearchAndPaginaton>
                        <ProductRender />
                    </SearchAndPaginaton>
                    {!isLoading && <Cart />}
                </div>
            </div>
        </CartProvider>
    );
};

export default Products;
