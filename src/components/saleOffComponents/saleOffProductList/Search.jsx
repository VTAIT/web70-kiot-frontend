import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAttachMoney, MdCategory } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";
import {
  filteredSaleOffClient,
  handleSameItem,
} from "../../../utils/arrayUtils";
import { saleOffProductListContext } from "./SaleOffProductListProvider";
import saleOffAPI from "../../../apis/saleOffAPI";

export const priceRange = ["0-10", "10-20", "20-30", "30-40", "40-50", "50"];

const Search = (props) => {
  const saleOffProps = useContext(saleOffProductListContext);
  const {
    itemsPerPage,
    defaultCussor,
    setIsLoading,
    setError,
    setTotalPages,
    setCurrentPage,
    query,
    setQuery,
    cachedData,
    setTotalData,
    setCurrentData,
    cussor,
    setCussor,
    handleGetAllSaleoff,
  } = saleOffProps;

  const changeSearchInput = (e) => {
    const newQueryValue = { ...query, search: e.target.value };
    setQuery(newQueryValue);
  };
  const changeRateInput = (e) => {
    const newQueryValue = { ...query, rate: e.target.value };
    setQuery(newQueryValue);
  };
  const changeActiveInput = (e) => {
    const newQueryValue = { ...query, active: e.target.value };
    setQuery(newQueryValue);
  };
  const changeFromDateInput = (e) => {
    const newQueryValue = { ...query, fromdate: e.target.value };
    setQuery(newQueryValue);
  };
  const changeToDateInput = (e) => {
    const newQueryValue = { ...query, todate: e.target.value };
    setQuery(newQueryValue);
  };

  const handleSearch = async () => {
    const { search, rate, active, fromdate, todate } = query;

    if (!search && !rate && !active && !fromdate && !todate) {
      return await handleGetAllSaleoff(defaultCussor);
    }

    let itemAfterClientSearch = filteredSaleOffClient(cachedData, query);

    if (itemAfterClientSearch.length <= itemsPerPage) {
      console.log("less than perpage");
      try {
        setIsLoading(true);

        itemAfterClientSearch = filteredSaleOffClient(cachedData, query);
        const res = await saleOffAPI.getAllSaleoff_query(cussor, query);
        const data = res.data.data;

        const newQueryData = handleSameItem(
          itemAfterClientSearch,
          data.saleOffProductList
        );

        setTotalData(newQueryData);

        setCussor(-1);
        setCurrentData(newQueryData.slice(0, itemsPerPage)); // Set initial currentData
        setTotalPages(Math.ceil(newQueryData.length / itemsPerPage));
        setCurrentPage(1);
      } catch (error) {
        console.log(error);
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
        setCurrentPage(1);
      } catch (error) {
        console.log(error);
        setError(
          `${error.response.data.messege}, ${error.response.data.error}`
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="search-form">
      <div className="search-input">
        <label htmlFor="search">
          <BsSearch />
        </label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Product name, id,..."
          value={query.search}
          onChange={(e) => changeSearchInput(e)}
        />
      </div>

      <div className="selection-container">
        <label htmlFor="rate">
          <MdOutlineAttachMoney />
        </label>
        <select
          name="rate"
          id="rate"
          onChange={(e) => changeRateInput(e)}
          value={query.rate}
        >
          <option value="">All rate</option>
          {priceRange.map((el) => {
            const limit = el.split("-");
            const min = limit[0];
            const max = limit[1];
            if (!max) {
              return (
                <option key={el} value={el}>
                  more than {min}
                </option>
              );
            } else {
              return (
                <option key={el} value={el}>
                  {min} to {max}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="selection-container">
        <label htmlFor="active">
          <AiOutlinePoweroff />
        </label>
        <select
          id="active"
          name="active"
          value={query.active}
          onChange={(e) => changeActiveInput(e)}
        >
          <option value="">All Active</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="selection-container date-selection">
        <div className="date-item">
          <label htmlFor="fromdate">From:</label>
          <input
            type="date"
            id="fromdate"
            name="fromdate"
            value={query.fromdate}
            onChange={(e) => changeFromDateInput(e)}
          />
        </div>
        <div className="date-item">
          <label htmlFor="todate">To:</label>
          <input
            type="date"
            id="todate"
            name="todate"
            value={query.todate}
            onChange={(e) => changeToDateInput(e)}
          />
        </div>
      </div>

      <button
        className="search-btn"
        onClick={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
