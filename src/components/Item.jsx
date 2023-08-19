import React from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
const Item = (props) => {
  const item = props.item;
  return (
    <tr>
      <td>
        <img src="../assets/images/products/img-2.png" alt="" height={52} />
        <p className="d-inline-block align-middle mb-0">
          <a href className="d-inline-block align-middle mb-0 product-name">
            {item.product_name}
          </a>
          <br />
          <span className="text-muted font-13">{item.description}</span>
        </p>
      </td>
      <td>{item.category}</td>
      <td>{item.pics}</td>
      <td>${item.price}</td>
      <td>{item.active}</td>
      <td>
        <a href>
          <FaRegPenToSquare className="text-info ms-2" />
        </a>
        <a href>
          <FaRegTrashCan className="text-danger ms-2" />
        </a>
      </td>
    </tr>
  );
};

export default Item;
