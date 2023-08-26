import React from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
                    <a
                        href
                        className="d-inline-block align-middle mb-0 product-name"
                    >
                        {item.product_name}
                    </a>
                    <br />
                    <span className="text-muted font-13">
                        {item.description}
                    </span>
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
                <span>
                    <FaRegPenToSquare className="text-info ms-2" />
                </span>
                <span>
                    <FaRegTrashCan className="text-danger ms-2" />
                </span>
            </td>
        </tr>
    );
};

export default Item;
