import React from "react";
import CartProvider from "../contexts/CartContext/CartProvider";
import Cart from "../components/productComponents/Cart";
import ProductProvider from "../components/productProviderComponents/ProductProvider";
import ProductRender from "../components/productComponents/ProductRender";
import Search from "../components/productProviderComponents/Search";

const Products = () => {
  return (
    <CartProvider>
      <div className="page-content">
        <div className="container-fluid">
          <Search />
          <div className="container-fluid product-container">
            <div className="container-fluid position-relative">
              <div className="row p-2">
                <ProductProvider perPage={16}>
                  <ProductRender />
                </ProductProvider>
              </div>
            </div>
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default Products;
