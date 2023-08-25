import React, { useState } from "react";
import ProductCart from "../components/productComponents/ProductCart";
import CartProvider from "../contexts/CartContext/CartProvider";
import productMockData from "../mocks/products.data.json";
import Cart from "../components/productComponents/Cart";
import Pagination from "../components/Pagination";
import Search from "../components/searchComponents/Search";

const Products = () => {
    const [products, setProducts] = useState([]);

    return (
        <CartProvider>
            <div className="page-content">
                <div className="container-fluid">
                    <Search />
                    <div className="row">
                        <div className="position-relative col-lg-8 d-flex flex-column align-items-center px-2 h-90vh ">
                            <div className="d-flex justify-content-evenly flex-wrap h-80vh over-flow-scroll scrollbar-small">
                                {products.map((item) => {
                                    return (
                                        <ProductCart
                                            product={item}
                                            key={item.id}
                                        />
                                    );
                                })}
                                <Pagination
                                    data={productMockData}
                                    setProducts={setProducts}
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 d-flex flex-column align-items-center pt-2 h-90vh">
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
        </CartProvider>
    );
};

export default Products;
