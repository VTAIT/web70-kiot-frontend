import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import productData from "../mocks/products.data.json";

const Pagination = ({ data, setProducts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const pageCount = Math.ceil(productData.length / itemsPerPage);

    useEffect(() => {
        const handlePagination = () => {
            const currentProductData = data.slice(
                currentPage * itemsPerPage - itemsPerPage,
                currentPage * itemsPerPage
            );
            setProducts(currentProductData);
        };
        handlePagination();
    }, [currentPage, data]);

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    };
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            marginPagesDisplayed={2}
            containerClassName="pagination"
            activeClassName="active"
        />
    );
};

export default Pagination;
