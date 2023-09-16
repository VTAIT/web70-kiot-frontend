import { useState } from "react";
import { filteredDataClient, handleSameItem } from "../../utils/arrayUtils";
import productAPI from "../../apis/productAPI";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Pagination from "./Pagination";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";

export const productPropsContext = createContext();

const ProductProvider = (props) => {
  const itemsPerPage = props.perPage;
  const defaultCussor = -1;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [cussor, setCussor] = useState(defaultCussor);
  const [saleOffProductList, setSaleOffProductList] = useState([]);
  const [saleOffTransactionList, setSaleOffTransactionList] = useState([]);
  const [cachedData, setCachedData] = useState([]); //all fetched data
  const [totalData, setTotalData] = useState([]); // data in total page
  const [currentData, setCurrentData] = useState([]); //data to render perpage

  //set query to send server
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const priceQuery = searchParams.get("price");
  const categoryQuery = searchParams.get("category");
  const fromdateQuery = searchParams.get("fromdate");
  const todateQuery = searchParams.get("todate");
  const currentKiot = searchParams.get("kiotId");

  const [query, setQuery] = useState({
    search: "",
    price: "",
    category: "",
    fromdate: "",
    todate: "",
    Did: currentKiot ? currentKiot : "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    handleGetAllProduct(defaultCussor);
  }, []);

  useEffect(() => {
    const newQuery = {
      search: searchQuery ? searchQuery : "",
      price: priceQuery ? priceQuery : "",
      category: categoryQuery ? categoryQuery : "",
      fromdate: fromdateQuery ? fromdateQuery : "",
      todate: todateQuery ? todateQuery : "",
      Did: currentKiot ? currentKiot : "",
    };
    setQuery(newQuery);
    handleSearch(newQuery);
  }, [
    searchQuery,
    priceQuery,
    categoryQuery,
    fromdateQuery,
    todateQuery,
    currentKiot,
  ]);

  const handleDataFromServer = async (cussor, newCurrentPage) => {
    const res = await productAPI.getAllProduct_query(cussor, query);
    const data = res.data.data;

    const newLoadedData = handleSameItem(cachedData, data.productList, true);
    const newSaleOffProductList = handleSameItem(
      saleOffProductList,
      data.saleOffProductList
    );
    const newSaleOffTransactionList = handleSameItem(
      saleOffTransactionList,
      data.saleOffTransactionList
    );
    setTotalData(newLoadedData);
    setCachedData(newLoadedData);
    setSaleOffProductList(newSaleOffProductList);
    setSaleOffTransactionList(newSaleOffTransactionList);
    setTotalPages(Math.ceil(newLoadedData.length / itemsPerPage));
    setCussor(data.cussor);

    //hanlde data when changing to new page
    if (newCurrentPage) {
      setCurrentData(
        newLoadedData.slice(
          (newCurrentPage - 1) * itemsPerPage,
          newCurrentPage * itemsPerPage
        )
      );
    } else {
      setCurrentData(data.productList.slice(0, itemsPerPage));
    }
  };

  const handleGetAllProduct = async (cussor = defaultCussor) => {
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
    let itemAfterClientSearch = filteredDataClient(cachedData, query);

    if (itemAfterClientSearch.length <= itemsPerPage) {
      console.log("less than perpage");
      try {
        setIsLoading(true);

        itemAfterClientSearch = filteredDataClient(cachedData, query);
        const res = await productAPI.getAllProduct_query(cussor, query);
        const data = res.data.data;

        const newQueryData = handleSameItem(
          itemAfterClientSearch,
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
        itemAfterClientSearch = await filteredDataClient(cachedData, query);

        setTotalData(itemAfterClientSearch);
        setCussor(itemAfterClientSearch.slice(-1)[0]._id - 1);
        setCurrentData(itemAfterClientSearch.slice(0, itemsPerPage)); // Set initial currentData
        setTotalPages(Math.ceil(itemAfterClientSearch.length / itemsPerPage));
      } catch (error) {
        setError(
          `${error.response.data.messege}, ${error.response.data.error}`
        );
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
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
    cachedData,
    setCachedData,
    setTotalData,
    saleOffProductList,
    setSaleOffProductList,
    saleOffTransactionList,
    setSaleOffTransactionList,
    currentData,
    setCurrentData,
    cussor,
    setCussor,
    searchParams,
    setSearchParams,
    currentKiot,
    handleDataFromServer,
    handleGetAllProduct,
  };

  if (isLoading) {
    return (
      <div className="flex-grow-1">
        <div className="position-absolute top-50 start-50 translate-middle">
          <Spinner animation="border" variant="info" />;
        </div>
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
    <productPropsContext.Provider value={Props}>
      <div className="container-fluid position-relative p-0">
        {props.children}
        <Pagination />
      </div>
    </productPropsContext.Provider>
  );
};

export default ProductProvider;
