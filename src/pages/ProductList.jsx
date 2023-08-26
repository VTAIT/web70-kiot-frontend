import React, { useState } from "react";
import TableList from "../components/productListComponents/TableList";
import productMockData from "../mocks/products.data.json";
import Pagination from "../components/Pagination";
import Search from "../components/searchComponents/Search";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    return (
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        {/* product list */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card-body position-relative h-90vh ">
                                    <>
                                        <Search />
                                        <TableList data={products} />
                                    </>
                                </div>
                                <Pagination
                                    data={productMockData}
                                    setProducts={setProducts}
                                    PerPage={12}
                                />
                            </div>
                        </div>
                        {/* end product list */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
