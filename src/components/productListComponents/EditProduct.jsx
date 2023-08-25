import React from "react";
import { useParams } from "react-router-dom";
import productMockData from "../../mocks/products.data.json";

const EditProduct = () => {
    const param = useParams();
    const product = productMockData.find((el) => el.id === param.productId);
    return (
        <div className="page-content">
            <div className="container-fluid">
                EDIT PRODUCT (COMMING SOON)
                <div> id:{product.id}</div>
                <div>name: {product.product_name}</div>
                <div>price: {product.price}</div>
            </div>
        </div>
    );
};

export default EditProduct;
