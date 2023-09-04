import React, { createContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import SearchAndPaginaton from "../components/searchComponents/SearchAndPaginaton";
import ProductListRender from "../components/productListComponents/ProductListRender";

export const productListContext = createContext();

const ProductList = () => {
    const [alert, setAlert] = useState(false);

    return (
        <productListContext.Provider value={{ setAlert }}>
            <SearchAndPaginaton>
                <ProductListRender />
            </SearchAndPaginaton>

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
