import React from "react";
import {
    FaRegPenToSquare,
    FaRegTrashCan,
} from 'react-icons/fa6'

const productList = [{}];

const PageContent = () => {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <h4 className="page-title">Product List</h4>
            </div>
            {/* product list */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Product Stock</h4>
                    <p className="text-muted mb-4 font-13">
                      Available all products.
                    </p>
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
                        <tr>
                          <td>
                            <img
                              src="../assets/images/products/img-2.png"
                              alt=""
                              height={52}
                            />
                            <p className="d-inline-block align-middle mb-0">
                              <a
                                href
                                className="d-inline-block align-middle mb-0 product-name"
                              >
                                Apple Watch
                              </a>
                              <br />
                              <span className="text-muted font-13">
                                Size-05 (Model 2019)
                              </span>
                            </p>
                          </td>
                          <td>Sports</td>
                          <td>32</td>
                          <td>$39</td>
                          <td>
                            Đang bán
                          </td>
                          <td>
                            <a href>
                              <FaRegPenToSquare className="text-info ms-2" />
                            </a>
                            <a href>
                              <FaRegTrashCan className="text-danger ms-2" />
                            </a>
                          </td>
                        </tr>
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
