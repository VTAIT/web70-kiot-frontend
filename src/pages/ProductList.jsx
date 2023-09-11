import React, { createContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import ProductListRender from "../components/productListComponents/ProductListRender";
import ProductProvider from "../components/productProviderComponents/ProductProvider";
import Search from "../components/productProviderComponents/Search";

export const productListContext = createContext();

const ProductList = () => {
  const [alert, setAlert] = useState(false);

  return (
    <productListContext.Provider value={{ setAlert }}>
      <div className="page-content px-2">
        <Search />
        <ProductProvider perPage={8}>
          <ProductListRender />
        </ProductProvider>
      </div>
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 999 }}
      >
        <Toast
          show={alert}
          onClose={() => setAlert(false)}
          bg="success"
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Alert</strong>
            <small>Just now!</small>
          </Toast.Header>
          <Toast.Body>Update product list successfull!</Toast.Body>
        </Toast>
      </ToastContainer>
    </productListContext.Provider>
  );
};

export default ProductList;
