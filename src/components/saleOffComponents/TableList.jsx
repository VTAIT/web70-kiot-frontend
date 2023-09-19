import React, { memo, useContext, useEffect, useState } from "react";
import Item from "./Item";
import { saleOffContext } from "./saleOffProvider/SaleOffProvider";

const TableList = () => {
  const { type, isLoading, currentData } = useContext(saleOffContext);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (currentData.length > 0 || !isLoading) {
      setDataLoaded(true);
    }
  }, [currentData, isLoading]);

  if (!currentData.length && dataLoaded) {
    return <div className="text-danger">There are no saleoffs</div>;
  }

  return (
    <table id="datatable" className="table table-bordered dt-responsive nowrap">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Rate</th>
          <th>Active</th>
          {type === 2 && <th>Code</th>}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((item) => (
          <Item saleOff={item} key={item._id} />
        ))}
      </tbody>
    </table>
  );
};

export default memo(TableList);
