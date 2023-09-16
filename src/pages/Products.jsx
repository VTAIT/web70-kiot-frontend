import React, { useContext, useEffect } from "react";
import CartProvider from "../contexts/CartContext/CartProvider";
import Cart from "../components/productComponents/Cart";
import ProductProvider from "../components/productProviderComponents/ProductProvider";
import ProductRender from "../components/productComponents/ProductRender";
import Search from "../components/productProviderComponents/Search";
import AppContext from "../contexts/AppContext/AppContext";
import leftNavBarItems from "../global/leftNavBarItems";

const Products = () => {
  const { handleLeftSideBarSelectedItem } = useContext(AppContext);
  useEffect(() => {
    localStorage.setItem("currentUrl", window.location.pathname);
    const selectedItem = leftNavBarItems.filter(
      (item) => item.path === window.location.pathname
    )[0];
    handleLeftSideBarSelectedItem(selectedItem.id);
  }, []);
  return (
    <CartProvider>
      <div className="page-content">
        <div className="container-fluid">
          <Search />
          <div className="container-fluid product-container">
            <div className="container-fluid position-relative p-0">
              <div className="row p-2">
                <ProductProvider perPage={15}>
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
