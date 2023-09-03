import React, { useState } from "react";
import ProductCart from "../components/productComponents/ProductCart";
import CartProvider from "../contexts/CartContext/CartProvider";
import Cart from "../components/productComponents/Cart";
import Pagination from "../components/productComponents/Pagination";
import Search from "../components/searchComponents/Search";
import { useEffect } from "react";
import productAPI from "../apis/productAPI";
import { Spinner } from "react-bootstrap";
import { handleSameItem } from "../utils/arrayUtils";

const Products = () => {
    const itemsPerPage = 8;
    const defaultCussor = -1;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [cussor, setCussor] = useState(defaultCussor);
    const [totalData, setTotalData] = useState([]); // data in total page
    const [currentData, setCurrentData] = useState([]); //data to render perpage
    const [query, setQuery] = useState({
        search: "",
        price: "",
        category: "",
        fromdate: "",
        todate: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const handleDataFromServer = (res, newCurrentPage) => {
        const data = res.data.data;

        const newLoadedData = handleSameItem(totalData, data.productList);

        setTotalData(newLoadedData);
        setCussor(data.cussor);
        setTotalPages(Math.ceil(newLoadedData.length / itemsPerPage));

        if (newCurrentPage) {
            setCurrentData(
                newLoadedData.slice(
                    (newCurrentPage - 1) * itemsPerPage,
                    newCurrentPage * itemsPerPage
                )
            );
        } else {
            setCurrentData(res.data.data.productList.slice(0, itemsPerPage));
        }
    };

    const handleGetAllProduct = async (cussor) => {
        try {
            setIsLoading(true);
            const res = await productAPI.getAllProduct(cussor);

            handleDataFromServer(res);

            setCurrentPage(1);
        } catch (error) {
            console.log(error);
            setError(
                `${error.response.data.messege}, ${error.response.data.error}`
            );
        } finally {
            setIsLoading(false);
        }
    };

    const Props = {
        setIsLoading,
        setTotalPages,
        totalPages,
        setCurrentPage,
        currentPage,
        query,
        setQuery,
        defaultCussor,
        handleGetAllProduct,
        totalData,
        setTotalData,
        currentData,
        setCurrentData,
        itemsPerPage,
        cussor,
        setCussor,
        handleDataFromServer,
    };

    useEffect(() => {
        handleGetAllProduct(defaultCussor);
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
                    <Search {...Props} />
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
                                    return <></>;
                                })}
                                <Pagination {...Props} />
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
