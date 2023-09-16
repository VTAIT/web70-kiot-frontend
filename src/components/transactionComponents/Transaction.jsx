import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

const Transaction = (props) => {
  const transaction = props.transaction;

  return (
    <tr>
      <td>{transaction.username}</td>
      <td>{transaction.kiot_id}</td>
      <td>{transaction.status}</td>
      <td>{transaction.deposit}</td>
      <td>{transaction.returnV}</td>
      <td>
        {transaction.retrun_list.map((returnedItem) => {
          return (
            <div>
              {returnedItem.name}:{returnedItem.value}
            </div>
          );
        })}
      </td>
      <td>
        {transaction.product_list.map((item) => {
          return (
            <div>
              {item.name}:{item.value}
            </div>
          );
        })}
      </td>
      <td>{transaction.code}_{transaction._id}</td>
      <td>{transaction.createdAt}</td>

      <td>
        {transaction.status !== 2 && (
          <span onClick={props.onEditTransaction}>
            <FaRegPenToSquare className="text-info ms-2" />
          </span>
        )}
      </td>
    </tr>
  );
};

export default Transaction;
