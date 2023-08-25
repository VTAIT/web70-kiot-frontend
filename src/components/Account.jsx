import React, { useState } from "react";
import accountAPI from "../apis/accountAPI";

const Account = (props) => {
  const account = props.account;
  const [loading, setLoading] = useState(false);
  
  const activateAccount = async (id) => {
    try {
      setLoading(true);
      await accountAPI.acceptById({ id: id });
      props.updateList()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <tr>
      <td>{account.username}</td>
      <td>{account.fullName}</td>
      <td>{account.phone}</td>
      <td>{account.email}</td>
      <td>{account.address}</td>
      <td>{account.status}</td>
      {account.status === 0 && (
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
    </tr>
  );
};

export default Account;
