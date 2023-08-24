import React, { useContext } from "react";
import Star from "./Star";
import cartContext from "../../contexts/CartContext/CartContext";
import { caculatePromotionPrice } from "../../utils/cartUtils";

const ProductCart = ({ product }) => {
    const { addProduct } = useContext(cartContext);
    return (
        <div
            className="card e-co-product w-30 m-2 "
            onClick={() => addProduct(product)}
        >
            <a href>
                <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid "
                />
            </a>
            {product.promotion && (
                <div className="ribbon ribbon-pink">
                    <span>{product.promotion_rate}% OFF</span>
                </div>
            )}
            <div className="card-body product-info rounded-2">
                <div className="w-100 d-flex justify-content-start">
                    <a href className="product-title">
                        {product.product_name}
                    </a>
                </div>

                <div className="d-flex justify-content-between my-2">
                    {product.promotion ? (
                        <p className="product-price">
                            $
                            {caculatePromotionPrice(
                                product.price,
                                product.promotion_rate
                            )}
                            <span className="ml-2">
                                {"   "}
                                <del>${product.price}</del>
                            </span>
                        </p>
                    ) : (
                        <p className="product-price">${product.price}</p>
                    )}

                    <ul className="list-inline mb-0 product-review align-self-center">
                        <Star customer_rate={product.customer_rate} />
                    </ul>
                </div>
                <div className="category px-3 rounded mb-2 bg-primary text-white waves-effect waves-light">
                    {product.category}
                </div>
            </div>
        </div>
    );
};

export default ProductCart;
