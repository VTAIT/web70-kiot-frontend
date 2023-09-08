import React from "react";
import CartProvider from "../contexts/CartContext/CartProvider";
import Cart from "../components/productComponents/Cart";
import SearchAndPaginaton from "../components/searchProductComponents/SearchAndPaginaton";
import ProductRender from "../components/productComponents/ProductRender";

const Products = () => {
  return (
    <CartProvider>
      <div className="page-content">
        <div className="container-fluid product-container">
          <SearchAndPaginaton perPage={16} rightSide={<Cart />}>
            <ProductRender />
          </SearchAndPaginaton>
        </div>
      </div>
    </CartProvider>
  );
};

export default Products;
