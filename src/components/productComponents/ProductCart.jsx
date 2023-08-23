import React from "react";
import Star from "./Star";

const ProductCart = ({ data }) => {
    return (
        <div className="card e-co-product w-30 m-2 p-2">
            <a href>
                <img src={data.image} alt={data.name} className="img-fluid " />
            </a>
            {data.promotion && (
                <div className="ribbon ribbon-pink">
                    <span>{data.promotion_rate}% OFF</span>
                </div>
            )}
            <div className="card-body product-info rounded-2">
                <div className="w-100 d-flex justify-content-start">
                    <a href className="product-title">
                        {data.product_name}
                    </a>
                </div>

                <div className="d-flex justify-content-between my-2">
                    {data.promotion ? (
                        <p className="product-price">
                            $
                            {(
                                data.price -
                                (data.price * data.promotion_rate) / 100
                            ).toFixed(2)}
                            <span className="ml-2">
                                {"   "}
                                <del>${data.price}</del>
                            </span>
                        </p>
                    ) : (
                        <p className="product-price">${data.price}</p>
                    )}

                    <ul className="list-inline mb-0 product-review align-self-center">
                        <Star customer_rate={data.customer_rate} />
                    </ul>
                </div>
                <div className="py-1 px-2 rounded mb-2 bg-primary text-white waves-effect waves-light">
                    {data.category}
                </div>
            </div>
            {/*end card-body*/}
        </div>
    );
};

export default ProductCart;
