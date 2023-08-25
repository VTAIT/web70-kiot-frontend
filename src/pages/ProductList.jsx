import React, { useState } from "react";
import TableList from "../components/productListComponents/TableList";
import productData from "../mocks/products.data.json";
import ReactPaginate from "react-paginate";

const ProductList = () => {
    //Pagination:
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 15;

    const pageCount = Math.ceil(productData.length / itemsPerPage);

    const currentProductData = productData.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    };

    return (
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        {/* product list */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body position-relative h-90vh ">
                                        <>
                                            <h4 className="mt-0 header-title">
                                                Product List
                                            </h4>
                                            <TableList
                                                data={currentProductData}
                                            />
                                        </>
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="next >"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={5}
                                            pageCount={pageCount}
                                            previousLabel="< previous"
                                            renderOnZeroPageCount={null}
                                            className="pagination"
                                        />
                                    </div>
                                </div>
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
