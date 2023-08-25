import React from "react";
import Item from "./Item";

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

const PageContent = () => {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            {/* <div className="page-title-box">
              <h4 className="page-title">Product List</h4>
            </div> */}
            {/* product list */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Product List</h4>
                   
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
                          <th>Product Name</th>
                          <th>Category</th>
                          <th>Pics</th>
                          <th>Price</th>
                          <th>Active</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList.map((item,index) => (
                          <Item item={item} key={index} />
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
  );
};

export default PageContent;
