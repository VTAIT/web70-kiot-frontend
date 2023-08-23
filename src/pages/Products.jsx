import React from "react";
import ProductCart from "../components/productComponents/ProductCart";
import productData from "../mocks/products.data.json";

const Products = () => {
    return (
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 d-flex justify-content-evenly flex-wrap">
                        {productData.map((item) => {
                            return <ProductCart data={item} key={item.id} />;
                        })}
                    </div>
                    <div className="col-lg-4 bg-secondary">Cart</div>
                </div>
            </div>
        </div>
    );
};

export default Products;
