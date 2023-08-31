import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAttachMoney, MdCategory } from "react-icons/md";

const categories = ["", "EU", "NA", "OC", "AF", "AS", "SA"];

const Search = (props) => {
    const [search, setSearch] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState({ from: "", to: "" });
    const [query, setQuery] = useState({
        search: "",
        price: "",
        category: "",
        date: "",
    });

    const handleSearch = () => {
        setQuery({
            search,
            price,
            category,
            date,
        });
        console.log({
            search,
            price,
            category,
            date,
        });
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
                    onChange={(e) => setSearch(e.target.value)}
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
                        onChange={(e) => setPrice(e.target.value)}
                    >
                        <option value="">All price</option>
                        <option value="50">less than 50</option>
                        <option value="50-100">50 to 100</option>
                        <option value="100">more than 100</option>
                    </select>
                </div>
                <div className="selection-container">
                    <label htmlFor="category">
                        <MdCategory />
                    </label>
                    <select
                        id="category"
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}
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
                        onChange={(e) =>
                            setDate((pre) => {
                                return { ...pre, from: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="date-item">
                    <label htmlFor="todate">To:</label>
                    <input
                        type="date"
                        id="todate"
                        name="todate"
                        onChange={(e) =>
                            setDate((pre) => {
                                return { ...pre, to: e.target.value };
                            })
                        }
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
