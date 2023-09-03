import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAttachMoney, MdCategory } from "react-icons/md";
import { filteredDataClient, handleSameItem } from "../../utils/arrayUtils";
import productAPI from "../../apis/productAPI";

export const categories = ["", "EU", "NA", "OC", "AF", "AS", "SA"];
export const priceRange = ["0-50", "50-100", "100"];

const Search = (props) => {
    const {
        query,
        setQuery,
        handleGetAllProduct,
        totalData,
        setTotalData,
        setCurrentData,
        setTotalPages,
        itemsPerPage,
        defaultCussor,
        setCurrentPage,
        setCussor,
        setIsLoading,
        setError,
    } = props;

    const changeSearchInput = (e) => {
        const newQueryValue = { ...query, search: e.target.value };
        setQuery(newQueryValue);
    };
    const changePriceInput = (e) => {
        const newQueryValue = { ...query, price: e.target.value };
        setQuery(newQueryValue);
    };
    const changeCategoryInput = (e) => {
        const newQueryValue = { ...query, category: e.target.value };
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
        const { search, price, category, fromdate, todate } = query;
        console.log("query", query);

        if (!search && !price && !category && !fromdate && !todate) {
            return await handleGetAllProduct(defaultCussor);
        }

        let itemAfterClientSearch = filteredDataClient(totalData, query);

        if (itemAfterClientSearch.length <= itemsPerPage) {
            console.log("less than perpage");
            try {
                setIsLoading(true);
                itemAfterClientSearch = filteredDataClient(totalData, query);
                const res = await productAPI.getAllProduct_query(
                    defaultCussor,
                    query
                );
                const data = res.data.data;
                const newQueryData = handleSameItem(
                    itemAfterClientSearch,
                    data.productList
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
                itemAfterClientSearch = filteredDataClient(totalData, query);

                setTotalData(itemAfterClientSearch);
                setCussor(-1);
                setCurrentData(itemAfterClientSearch.slice(0, itemsPerPage)); // Set initial currentData
                setTotalPages(
                    Math.ceil(itemAfterClientSearch.length / itemsPerPage)
                );
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

            <div className="select-input">
                <div className="selection-container">
                    <label htmlFor="price">
                        <MdOutlineAttachMoney />
                    </label>
                    <select
                        name="price"
                        id="price"
                        onChange={(e) => changePriceInput(e)}
                        value={query.price}
                    >
                        <option value="">All price</option>
                        {priceRange.map((el) => {
                            const limit = el.split("-");
                            const min = limit[0];
                            const max = limit[1];
                            if (!max) {
                                return (
                                    <option value={el}>more than {min}</option>
                                );
                            } else {
                                return (
                                    <option value={el}>
                                        {min} to {max}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
                <div className="selection-container">
                    <label htmlFor="category">
                        <MdCategory />
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={query.category}
                        onChange={(e) => changeCategoryInput(e)}
                    >
                        {categories.map((item) => (
                            <option key={item} value={item ? item : ""}>
                                {item ? item : "All category"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="selection-container date-selection">
                {/* <p>
                    <span>Date:</span>
                </p> */}
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
