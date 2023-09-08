import React from "react";
import EditSaleOffModal from "./EditSaleOffModal";

const Item = (props) => {
  const saleOff = props.saleOff;
  return (
    <tr>
      <td>
        <p className="d-inline-block align-middle mb-0">
          <div className="d-inline-block align-middle mb-0 product-name">
            {saleOff.name_product}
          </div>
        </p>
      </td>
      <td>{saleOff.price}%</td>
      <td>
        {saleOff.active ? (
          <p className="text-success m-0"> Yes</p>
        ) : (
          <p className="text-danger m-0">No</p>
        )}
      </td>
      <td>
        <EditSaleOffModal saleOff={saleOff} />
      </td>
    </tr>
  );
};

export default Item;
