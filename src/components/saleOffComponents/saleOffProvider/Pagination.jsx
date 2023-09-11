import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { handleSameItem } from "../../../utils/arrayUtils";
import { saleOffContext } from "./SaleOffProvider";
import saleOffAPI from "../../../apis/saleOffAPI";

const Pagination = (props) => {
  const saleOffProps = useContext(saleOffContext);
  const {
    type,
    itemsPerPage,
    setError,
    totalPages,
    setTotalPages,
    setCurrentPage,
    query,
    totalData,
    setTotalData,
    setCurrentData,
    cussor,
    setCussor,
    handleDataFromServer,
  } = saleOffProps;

  const handlePageClick = async (e) => {
    const newCurrentPage = e.selected + 1;

    setCurrentPage(newCurrentPage);
    //when client access to the  last page, load more 50 items
    const isQuerying = Boolean(
      query.search ||
        query.rate ||
        query.active ||
        query.fromdate ||
        query.todate
    );

    if (newCurrentPage >= totalPages && !isQuerying) {
      try {
        handleDataFromServer(cussor, newCurrentPage);
      } catch (error) {
        setError(
          `${error.response.data.messege}, ${error.response.data.error}`
        );
      }
    } else if (newCurrentPage >= totalPages && isQuerying) {
      try {
        const res = await saleOffAPI.getAllSaleoff_query(cussor, query);

        const data = res.data.data;
        let newQueryData = [];

        if (type === 1) {
          newQueryData = handleSameItem(totalData, data.saleOffProductList);
        } else if (type === 2) {
          newQueryData = handleSameItem(totalData, data.saleOffTransactionList);
        }

        setTotalData(newQueryData);
        setCussor(data.cussor);
        setTotalPages(Math.ceil(newQueryData.length / itemsPerPage));
        setCurrentData(
          newQueryData.slice(
            (newCurrentPage - 1) * itemsPerPage,
            newCurrentPage * itemsPerPage
          )
        );
      } catch (error) {
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
