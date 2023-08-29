import React, { useState } from "react";
import accountAPI from "../apis/accountAPI";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

const Account = (props) => {
  const account = props.account;
  const [loading, setLoading] = useState(false);
  console.log(account);
  const activateAccount = async (id) => {
    console.log("id:", id);
    try {
      setLoading(true);
      await accountAPI.acceptById({ id: id });
      props.updateList();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr style={{ height: 60, textAlign: "center" }}>
      <td>{account.username}</td>
      <td>{account.fullName}</td>
      <td>{account.phone}</td>
      <td>{account.email}</td>
      <td>{account.address}</td>

      {account.status && (
        <>
          <td>{account.status}</td>
          {account.status === 1 ? (
            <td>Activated</td>
          ) : (
            <td>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => activateAccount(account._id)}
              >
                {loading ? "Activating" : "Activate"}
              </button>
            </td>
          )}
        </>
      )}
      {account.active &&
        !(window.location.pathname.indexOf("pending") > -1) && (
          <>
            <td>{account.active ? "Yes" : "No"}</td>
            <td>{account.kiot_id}</td>
            <td>{account.role_id}</td>
            <td>{account.createdAt}</td>
            <td>
              <span onClick={props.onEditAccount}>
                <FaRegPenToSquare className="text-info ms-2" />
              </span>
              <span onClick={props.onDeleteAccount}>
                <FaRegTrashCan className="text-danger ms-2" />
              </span>
            </td>
          </>
        )}
    </tr>
  );
};

export default Account;
