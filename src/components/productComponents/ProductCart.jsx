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
            <img
                src={product.image}
                alt={product.name}
                className="img-fluid "
            />

            {product.promotion && (
                <div className="ribbon ribbon-pink">
                    <span>{product.promotion_rate}% OFF</span>
                </div>
            )}
            <div className="card-body product-info rounded-2">
                <div className="w-100 d-flex justify-content-start">
                    <div className="product-title">{product.product_name}</div>
                </div>

                <div className="d-flex flex-column justify-content-between my-2">
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

                    <ul className="list-inline mb-0 product-review">
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
