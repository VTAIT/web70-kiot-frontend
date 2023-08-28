import React, { useState } from "react";
import TableList from "../components/productListComponents/TableList";
import Pagination from "../components/Pagination";
import Search from "../components/searchComponents/Search";
import AddProductModal from "../components/productListComponents/AddProductModal";
import { useEffect } from "react";
import productAPI from "../apis/productAPI";
import { Spinner } from "react-bootstrap";

const ProductList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [dataServer, setDataServer] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const handleGetAllProduct = async () => {
            try {
                setIsLoading(true);
                const res = await productAPI.getAllProduct();
                setDataServer(res.data.data.productList);
            } catch (error) {
                console.log(error);
                setError(error.data.message);
            } finally {
                setIsLoading(false);
            }
        };
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
                                    PerPage={10}
                                />
                            </div>
                        </div>
                        {/* end product list */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
