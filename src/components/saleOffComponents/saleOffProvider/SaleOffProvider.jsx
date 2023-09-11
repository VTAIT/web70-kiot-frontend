import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Pagination from "./Pagination";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import saleOffAPI from "../../../apis/saleOffAPI";
import {
  filteredSaleOffClient,
  handleSameItem,
} from "../../../utils/arrayUtils";

export const saleOffContext = createContext();

const SaleOffProvider = (props) => {
  const { type, children, perPage } = props;
  const itemsPerPage = perPage;
  const defaultCussor = -1;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [cussor, setCussor] = useState(defaultCussor);
  const [cachedData, setCachedData] = useState([]); //all fetched data
  const [totalData, setTotalData] = useState([]); // data in total page
  const [currentData, setCurrentData] = useState([]); //data to render perpage

  //set query to send server
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const rateQuery = searchParams.get("rate");
  const activeQuery = searchParams.get("active");
  const fromdateQuery = searchParams.get("fromdate");
  const todateQuery = searchParams.get("todate");
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

  useEffect(() => {
    handleGetAllSaleoff(defaultCussor);
  }, []);

  useEffect(() => {
    const newQuery = {
      search: searchQuery ? searchQuery : "",
      rate: rateQuery ? rateQuery : "",
      active: activeQuery ? activeQuery : "",
      fromdate: fromdateQuery ? fromdateQuery : "",
      todate: todateQuery ? todateQuery : "",
      Did: currentKiot ? currentKiot : "",
    };
    setQuery(newQuery);
    handleSearch(newQuery);
  }, [
    searchQuery,
    rateQuery,
    activeQuery,
    fromdateQuery,
    todateQuery,
    currentKiot,
  ]);

  const handleDataFromServer = async (cussor, newCurrentPage) => {
    const res = await saleOffAPI.getAllSaleoff(cussor, query);
    const data = res.data.data;

    let newLoadedData = [];
    if (type === 1) {
      newLoadedData = handleSameItem(cachedData, data.saleOffProductList, true);
    } else if (type === 2) {
      newLoadedData = handleSameItem(
        cachedData,
        data.saleOffTransactionList,
        true
      );
    }

    setTotalData(newLoadedData);
    setCachedData(newLoadedData);
    setTotalPages(Math.ceil(newLoadedData.length / itemsPerPage));
    setCussor(data.cussor);

    if (newCurrentPage) {
      setCurrentData(
        newLoadedData.slice(
          (newCurrentPage - 1) * itemsPerPage,
          newCurrentPage * itemsPerPage
        )
      );
    } else {
      if (type === 1) {
        setCurrentData(data.saleOffProductList.slice(0, itemsPerPage));
      } else if (type === 2) {
        setCurrentData(data.saleOffTransactionList.slice(0, itemsPerPage));
      }
    }
  };

  const handleGetAllSaleoff = async (cussor = defaultCussor) => {
    try {
      setIsLoading(true);
      handleDataFromServer(cussor);
    } catch (error) {
      setError(`${error.response.data.messege}, ${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setCurrentPage(1);
    let itemAfterClientSearch = filteredSaleOffClient(cachedData, query);

    if (itemAfterClientSearch.length <= itemsPerPage) {
      console.log("less than perpage");
      try {
        setIsLoading(true);

        itemAfterClientSearch = filteredSaleOffClient(cachedData, query);
        const res = await saleOffAPI.getAllSaleoff_query(cussor, query);
        const data = res.data.data;

        let newQueryData = [];

        if (type === 1) {
          newQueryData = handleSameItem(
            itemAfterClientSearch,
            data.saleOffProductList
          );
        } else if (type === 2) {
          newQueryData = handleSameItem(
            itemAfterClientSearch,
            data.saleOffTransactionList
          );
        }

        setTotalData(newQueryData);
        setCurrentData(newQueryData.slice(0, itemsPerPage)); // Set initial currentData
        setTotalPages(Math.ceil(newQueryData.length / itemsPerPage));
      } catch (error) {
        setError(
          `${error.response.data.messege}, ${error.response.data.error}`
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("more than perpage");
      try {
        setIsLoading(true);
        itemAfterClientSearch = await filteredSaleOffClient(cachedData, query);
        setTotalData(itemAfterClientSearch);
        setCussor(itemAfterClientSearch.slice(-1)[0]._id - 1);
        setCurrentData(itemAfterClientSearch.slice(0, itemsPerPage)); // Set initial currentData
        setTotalPages(Math.ceil(itemAfterClientSearch.length / itemsPerPage));
      } catch (error) {
        setError(error.response);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
  };

  const Props = {
    type,
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
    <div className="w-100">
      <div className="row p-2">
        <saleOffContext.Provider value={Props}>
          {children}
          <Pagination />
        </saleOffContext.Provider>
      </div>
    </div>
  );
};

export default SaleOffProvider;
