import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import productAPI from "../apis/productAPI";
import { handleSameItem } from "../utils/arrayUtils";

const Pagination = (props) => {
    const {
        totalData,
        setTotalData,
        setCurrentData,
        itemsPerPage,
        defaultCussor,
    } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(
        Math.ceil(totalData.length / itemsPerPage)
    );
    const handlePageClick = async (e) => {
        const newCurrentPage = e.selected + 1;
        setCurrentPage(newCurrentPage);

        //when client access to the previous of last page, load more 50 items
        if (newCurrentPage > totalPages - 1) {
            const res = await productAPI.getAllProduct(
                totalData.length + defaultCussor
            );

            const newLoadedData = handleSameItem(
                totalData,
                res.data.data.productList
            );

            setTotalData(newLoadedData);
            setTotalPages(Math.ceil(newLoadedData.length / itemsPerPage));
            setCurrentData(
                newLoadedData.slice(
                    (newCurrentPage - 1) * itemsPerPage,
                    newCurrentPage * itemsPerPage
                )
            );
        } else {
            setCurrentData(
                totalData.slice(
                    (newCurrentPage - 1) * itemsPerPage,
                    newCurrentPage * itemsPerPage
                )
            );
        }
    };
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={totalPages}
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
            marginPagesDisplayed={1}
            containerClassName="pagination"
            activeClassName="active"
        />
    );
};

export default Pagination;
