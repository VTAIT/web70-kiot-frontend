import React, { useState } from "react";
import ProductCart from "../components/productComponents/ProductCart";
import CartProvider from "../contexts/CartContext/CartProvider";
import Cart from "../components/productComponents/Cart";
import Pagination from "../components/Pagination";
import Search from "../components/searchComponents/Search";
import { useEffect } from "react";
import productAPI from "../apis/productAPI";
import { Spinner } from "react-bootstrap";

const Products = () => {
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
                setError(
                    `${error.response.data.messege}, ${error.response.data.error}`
                );
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
        <CartProvider>
            <div className="page-content">
                <div className="container-fluid">
                    <Search />
                    <div className="row">
                        <div className="position-relative col-lg-8 d-flex flex-column align-items-center px-2 h-70vh ">
                            <div className="d-flex justify-content-around flex-wrap h-70vh over-flow-scroll scrollbar-small">
                                {products.map((item) => {
                                    return (
                                        <ProductCart
                                            product={item}
                                            key={item._id}
                                        />
                                    );
                                })}
                                <Pagination
                                    data={dataServer}
                                    setProducts={setProducts}
                                    PerPage={16}
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 d-flex flex-column align-items-center pt-2  h-70vh">
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
        </CartProvider>
    );
};

export default Products;
