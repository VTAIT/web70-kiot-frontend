import React, { createContext, useState } from "react";
import TableList from "../components/productListComponents/TableList";
import Search from "../components/searchComponents/Search";
import AddProductModal from "../components/productListComponents/AddProductModal";
import { useEffect } from "react";
import productAPI from "../apis/productAPI";
import { Spinner, Toast, ToastContainer } from "react-bootstrap";
import Pagination from "../components/productComponents/Pagination";
import { handleSameItem } from "../utils/arrayUtils";

export const productListContext = createContext();

const ProductList = () => {
    const itemsPerPage = 8;
    const defaultCussor = -1;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(false);

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
                                            <Search {...Props} />
                                            <AddProductModal />
                                            <TableList data={currentData} />
                                        </>
                                    </div>
                                    <Pagination {...Props} />
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
