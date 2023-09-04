import React from "react";
import ReactPaginate from "react-paginate";
import productAPI from "../../apis/productAPI";
import { handleSameItem } from "../../utils/arrayUtils";

const Pagination = (props) => {
    const {
        totalData,
        setTotalData,
        setCurrentData,
        itemsPerPage,
        cussor,
        setCussor,
        query,
        totalPages,
        setTotalPages,
        setCurrentPage,
        handleDataFromServer,
        setError,
        saleOffProductList,
        setSaleOffProductList,
        saleOffTransactionList,
        setSaleOffTransactionList,
    } = props;

    const handlePageClick = async (e) => {
        const newCurrentPage = e.selected + 1;

        setCurrentPage(newCurrentPage);
        //when client access to the  last page, load more 50 items
        const isQuerying = Boolean(
            query.search ||
                query.price ||
                query.category ||
                query.fromdate ||
                query.todate
        );

        if (newCurrentPage >= totalPages && !isQuerying) {
            try {
                const res = await productAPI.getAllProduct(cussor);
                handleDataFromServer(res, newCurrentPage);
            } catch (error) {
                console.log(error);
                setError(
                    `${error.response.data.messege}, ${error.response.data.error}`
                );
            }
        } else if (newCurrentPage >= totalPages && isQuerying) {
            // const itemAfterClientSearch = filteredDataClient(totalData, query);

            try {
                const res = await productAPI.getAllProduct_query(cussor, query);

                const data = res.data.data;

                const newQueryData = handleSameItem(
                    totalData,
                    data.productList
                );
                const newSaleOffProductList = handleSameItem(
                    saleOffProductList,
                    data.saleOffProductList
                );
                const newSaleOffTransactionList = handleSameItem(
                    saleOffTransactionList,
                    data.saleOffTransactionList
                );

                setTotalData(newQueryData);
                setSaleOffProductList(newSaleOffProductList);
                setSaleOffTransactionList(newSaleOffTransactionList);

                setCussor(data.cussor);
                setTotalPages(Math.ceil(newQueryData.length / itemsPerPage));
                setCurrentData(
                    newQueryData.slice(
                        (newCurrentPage - 1) * itemsPerPage,
                        newCurrentPage * itemsPerPage
                    )
                );
            } catch (error) {
                console.log(error);
                setError(
                    `${error.response.data.messege}, ${error.response.data.error}`
                );
            }
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
