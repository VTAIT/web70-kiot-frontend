import React from "react";
import { GiSightDisabled } from "react-icons/gi";
import EditProductModal from "./EditProductModal";

const Item = (props) => {
    const item = props.item;
    return (
        <tr>
            <td>
                <img
                    src="../assets/images/products/img-2.png"
                    alt=""
                    height={52}
                />
                <p className="d-inline-block align-middle mb-0">
                    <div className="d-inline-block align-middle mb-0 product-name">
                        {item.product_name}
                    </div>
                    <br />
                    {/* <span className="text-muted font-13">
                        {item.description}
                    </span> */}
                </p>
            </td>
            <td>{item.category}</td>
            <td>${item.price}</td>
            <td>
                {item.promotion ? (
                    <p className="text-success m-0"> Yes</p>
                ) : (
                    <p className="text-danger m-0">No</p>
                )}
            </td>
            <td>
                {item.active ? (
                    <p className="text-success m-0"> Yes</p>
                ) : (
                    <p className="text-danger m-0">No</p>
                )}
            </td>
            <td>
                <EditProductModal product={item} />
                {item.active && (
                    <span>
                        <GiSightDisabled className="text-danger ms-2" />
                    </span>
                )}
            </td>
        </tr>
    );
};

export default Item;
