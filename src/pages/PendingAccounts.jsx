import React, { useEffect, useState } from "react";
import Account from "../components/accountComponents/Account";
import accountAPI from "../apis/accountAPI";

const PendingAccounts = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegisterUser();
  }, []);

  const fetchRegisterUser = async () => {
    try {
      setLoading(true);
      const response = await accountAPI.getAllAccept();
      console.log(response);
      setRegisteredUsers(response.data.data.accountList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="page-content">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {loading ? <h2>Loading ... </h2> :
                    <div className="card-body">
                      <h4 className="mt-0 header-title">
                        Registered Account List
                      </h4>

                      <table
                        id="datatable"
                        className="table table-bordered dt-responsive nowrap"
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr style={{textAlign:"center"}}>
                            <th>User Name</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registeredUsers &&
                            registeredUsers.length > 0 &&
                            registeredUsers.map((account, index) => {
                             
                              return (
                                <Account
                                  account={account}
                                  key={index}
                                  updateList={fetchRegisterUser}
                                />
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default PendingAccounts;
