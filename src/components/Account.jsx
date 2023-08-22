import React from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

const Account = (props) => {
  const account = props.account;
  return (
    <tr>
      <td>
        <img src="../assets/images/products/img-2.png" alt="" height={52} />
        <p className="d-inline-block align-middle mb-0">
          <a href className="d-inline-block align-middle mb-0 product-name">
            {account.username}
          </a>
          <br />
          <span className="text-muted font-13">{account.description}</span>
        </p>
      </td>
      <td>{account.category}</td>
      <td>{account.pics}</td>
      <td>${account.price}</td>
      <td>{account.active}</td>
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

export default Account;
