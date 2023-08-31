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

    const [totalData, setTotalData] = useState([]);
    const [currentData, setCurrentData] = useState([]);

    const itemsPerPage = 20;
    const defaultCussor = 50;
    const paginationProps = {
        totalData,
        setTotalData,
        currentData,
        setCurrentData,
        itemsPerPage,
        defaultCussor,
    };

    useEffect(() => {
        const handleGetAllProduct = async () => {
            try {
                setIsLoading(true);
                const res = await productAPI.getAllProduct(defaultCussor);
                const data = res.data.data.productList;
                setTotalData(data);

                setCurrentData(data.slice(0, itemsPerPage)); // Set initial currentData
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
                                {currentData.map((item) => {
                                    if (item.active === true) {
                                        return (
                                            <ProductCart
                                                product={item}
                                                key={item._id}
                                            />
                                        );
                                    }
                                })}
                                <Pagination {...paginationProps} />
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
