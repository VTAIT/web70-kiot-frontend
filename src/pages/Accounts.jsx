import React from "react";
import Account from "../components/Account";

const Accounts = () => {
  const productList = [
    {
      product_name: "Apple Watch",
      description: "Size-05 (Model 2019)",
      category: "Sports",
      pics: 32,
      price: 39,
      active: "Đang bán",
    },
    {
      product_name: "Apple Watch",
      description: "Size-05 (Model 2019)",
      category: "Sports",
      pics: 32,
      price: 39,
      active: "Đang bán",
    },
    {
      product_name: "Apple Watch",
      description: "Size-05 (Model 2019)",
      category: "Sports",
      pics: 32,
      price: 39,
      active: "Đang bán",
    },
    {
      product_name: "Apple Watch",
      description: "Size-05 (Model 2019)",
      category: "Sports",
      pics: 32,
      price: 39,
      active: "Đang bán",
    },
    {
      product_name: "Apple Watch",
      description: "Size-05 (Model 2019)",
      category: "Sports",
      pics: 32,
      price: 39,
      active: "Đang bán",
    },
    {
      product_name: "Apple Watch",
      description: "Size-05 (Model 2019)",
      category: "Sports",
      pics: 32,
      price: 39,
      active: "Đang bán",
    },
    {
      product_name: "Apple Watch",
      description: "Size-05 (Model 2019)",
      category: "Sports",
      pics: 32,
      price: 39,
      active: "Đang bán",
    },
  ];
  const accountList = [];
  return (
    <div>
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
                            <th>Category</th>
                            <th>Pics</th>
                            <th>Price</th>
                            <th>Active</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accountList.map((account, index) => (
                            <Account account={account} key={index} />
                          ))}
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
    </div>
  );
};

export default Accounts;
