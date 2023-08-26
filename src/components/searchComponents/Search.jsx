import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAttachMoney, MdCategory } from "react-icons/md";

const Search = (props) => {
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
                />
            </div>

            <div className="select-input">
                <div className="selection-container">
                    <label htmlFor="price">
                        <MdOutlineAttachMoney />
                    </label>
                    <select name="price" id="price">
                        <option value="all">All price</option>
                        <option value="50">less than 50</option>
                        <option value="50-100">50 to 100</option>
                        <option value="100">more than 100</option>
                    </select>
                </div>
                <div className="selection-container">
                    <label htmlFor="category">
                        <MdCategory />
                    </label>
                    <select id="category" name="category">
                        <option value="all">All category</option>
                        <option value="eu">EU</option>
                        <option value="na">NA</option>
                        <option value="oc">OC</option>
                        <option value="af">AF</option>
                        <option value="as">AS</option>
                        <option value="sa">SA</option>
                    </select>
                </div>
            </div>
            <div className="selection-container date-selection">
                {/* <p>
                    <span>Date:</span>
                </p> */}
                <div className="date-item">
                    <label htmlFor="fromdate">From:</label>
                    <input type="date" id="fromdate" name="fromdate" />
                </div>
                <div className="date-item">
                    <label htmlFor="todate">To:</label>
                    <input type="date" id="todate" name="todate" />
                </div>
            </div>

            <button className="search-btn">Search</button>
        </form>
    );
};

export default Search;
