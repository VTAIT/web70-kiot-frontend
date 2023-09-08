import React from "react";
import Item from "./Item";

const TableList = ({ data }) => {
  return (
    <table id="datatable" className="table table-bordered dt-responsive nowrap">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Rate</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {!data.length ? (
          <div className="text-danger">
            There are no prodcuts match with your search. Please choose the
            correct value!
          </div>
        ) : (
          data.map((item) => <Item saleOff={item} key={item._id} />)
        )}
      </tbody>
    </table>
  );
};

export default TableList;
