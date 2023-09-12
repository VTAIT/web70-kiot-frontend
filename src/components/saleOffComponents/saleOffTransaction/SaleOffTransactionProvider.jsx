import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Search from "./Search";
import Pagination from "./Pagination";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import saleOffAPI from "../../../apis/saleOffAPI";
import { handleSameItem } from "../../../utils/arrayUtils";

export const saleOffTransactionContext = createContext();

const SaleOffTransactionProvider = ({ children }) => {
  const itemsPerPage = 8;
  const defaultCussor = -1;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [cussor, setCussor] = useState(defaultCussor);
  const [cachedData, setCachedData] = useState([]); //all fetched data
  const [totalData, setTotalData] = useState([]); // data in total page
  const [currentData, setCurrentData] = useState([]); //data to render perpage

  //set query to send server
  const [searchParams, setSearchParams] = useSearchParams();
  const currentKiot = searchParams.get("kiotId");
  const [query, setQuery] = useState({
    search: "",
    rate: "",
    active: "",
    fromdate: "",
    todate: "",
    Did: currentKiot ? currentKiot : "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const handleDataFromServer = (res, newCurrentPage) => {
    const data = res.data.data;

    const newLoadedData = handleSameItem(
      cachedData,
      data.saleOffTransactionList,
      true
    );

    setCachedData(newLoadedData);
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
      setCurrentData(data.saleOffTransactionList.slice(0, itemsPerPage));
    }
  };

  const handleGetAllSaleoff = async (cussor = defaultCussor) => {
    try {
      setIsLoading(true);
      const res = await saleOffAPI.getAllSaleoff(cussor, query);

      handleDataFromServer(res);

      setCurrentPage(1);
    } catch (error) {
      console.log(error);
      setError(`${error.response.data.messege}, ${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const Props = {
    itemsPerPage,
    defaultCussor,
    setIsLoading,
    setError,
    totalPages,
    setTotalPages,
    currentPage,
    setCurrentPage,
    query,
    setQuery,
    totalData,
    setTotalData,
    cachedData,
    setCachedData,
    currentData,
    setCurrentData,
    cussor,
    setCussor,
    searchParams,
    setSearchParams,
    currentKiot,
    handleDataFromServer,
    handleGetAllSaleoff,
  };

  useEffect(() => {
    handleGetAllSaleoff(defaultCussor);
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
      <div className="container-fluid position-relative">
        <div className="row p-2">
          <saleOffTransactionContext.Provider value={Props}>
            <Search />
            {children}
            <Pagination />
          </saleOffTransactionContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default SaleOffTransactionProvider;
