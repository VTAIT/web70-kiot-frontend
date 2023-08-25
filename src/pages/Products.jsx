import React, { useState } from "react";
import ProductCart from "../components/productComponents/ProductCart";
import CartProvider from "../contexts/CartContext/CartProvider";
import productData from "../mocks/products.data.json";
import Cart from "../components/productComponents/Cart";
import ReactPaginate from "react-paginate";

const Products = () => {
    //Pagination:
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 15;

    const pageCount = Math.ceil(productData.length / itemsPerPage);

    const currentProductData = productData.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    };
    return (
        <CartProvider>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className=" col-lg-8 d-flex flex-column align-items-center pt-2 ">
                            <div className="w-100 d-flex justify-content-center align-items-center border-bottom border-secondary">
                                <h4>Products</h4>
                            </div>
                            <div className="d-flex justify-content-evenly flex-wrap h-80vh over-flow-scroll scrollbar-small">
                                {currentProductData.map((item) => {
                                    return (
                                        <ProductCart
                                            product={item}
                                            key={item.id}
                                        />
                                    );
                                })}
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="< previous"
                                    renderOnZeroPageCount={null}
                                    className="pagination"
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 d-flex flex-column align-items-center pt-2 ">
                            <div className="w-100 d-flex justify-content-center align-items-center border-bottom border-secondary">
                                <h4>Selected Products</h4>
                            </div>
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
        </CartProvider>
    );
};

export default Products;
