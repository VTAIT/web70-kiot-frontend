import React, { useEffect, useState } from "react";
import Account from "../components/Account";
import accountAPI from "../apis/accountAPI";

const Accounts = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchRegisterUser();
  }, []);

  const fetchRegisterUser = async () => {
    try {
      setLoading(true);
      const response = await accountAPI.getAllAccept();
      setRegisteredUsers(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            {/* account list */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Account List</h4>

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
                        <tr>
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
                        {registeredUsers.map((account, index) => {
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
