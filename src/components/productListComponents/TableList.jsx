import React from "react";
import Item from "./Item";

const TableList = ({ data }) => {
    return (
        <table
            id="datatable"
            className="table table-bordered dt-responsive nowrap"
        >
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Promotion</th>
                    <th>Active</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <Item item={item} key={index} />
                ))}
            </tbody>
        </table>
    );
};

export default TableList;
