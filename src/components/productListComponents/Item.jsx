import React from "react";
import EditProductModal from "./EditProductModal";

const Item = (props) => {
    const item = props.item;
    return (
        <tr>
            <td>
                <p className="d-inline-block align-middle mb-0">
                    <div className="d-inline-block align-middle mb-0 product-name">
                        {item.name_product}
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
            </td>
        </tr>
    );
};

export default Item;
