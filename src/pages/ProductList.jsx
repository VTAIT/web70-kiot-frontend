import React, { createContext, useState } from "react";
import TableList from "../components/productListComponents/TableList";
import Pagination from "../components/Pagination";
import Search from "../components/searchComponents/Search";
import AddProductModal from "../components/productListComponents/AddProductModal";
import { useEffect } from "react";
import productAPI from "../apis/productAPI";
import { Spinner, Toast, ToastContainer } from "react-bootstrap";

export const productListContext = createContext();

const ProductList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(false);

    const [dataServer, setDataServer] = useState([]);
    const [products, setProducts] = useState([]);

    const handleGetAllProduct = async () => {
        try {
            setIsLoading(true);
            const res = await productAPI.getAllProduct();
            setDataServer(res.data.data.productList);
        } catch (error) {
            console.log(error);
            setError(
                `${error.response.data.messege}, ${error.response.data.error}`
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetAllProduct();
    }, []);

    if (isLoading) {
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <Spinner animation="border" variant="info" />;
            </div>
        );
    }

    if (error) {
        return (
            <div className="position-absolute top-50 start-50 translate-middle text-danger">
                {error}
            </div>
        );
    }

    return (
        <productListContext.Provider value={{ handleGetAllProduct, setAlert }}>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            {/* product list */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="card-body position-relative h-90vh ">
                                        <>
                                            <Search />
                                            <AddProductModal />
                                            <TableList data={products} />
                                        </>
                                    </div>
                                    <Pagination
                                        data={dataServer}
                                        setProducts={setProducts}
                                        PerPage={8}
                                    />
                                </div>
                            </div>
                            {/* end product list */}
                        </div>
                    </div>
                </div>
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
