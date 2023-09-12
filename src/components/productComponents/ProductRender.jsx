import React from "react";
import { useContext } from "react";
import { productPropsContext } from "../searchProductComponents/SearchAndPaginaton";
import ProductCart from "./ProductCart";

const ProductRender = () => {
  const productProps = useContext(productPropsContext);
  return (
    <div className="d-flex justify-content-around flex-wrap h-65vh over-flow-scroll scrollbar-small">
      {!productProps.currentData.length ? (
        <div className="text-danger">
          There are no prodcuts match with your search. Please choose the
          correct value!
        </div>
      ) : (
        productProps.currentData.map((item) => {
          if (item.active === true) {
            return <ProductCart product={item} key={item._id} />;
          }
          return <></>;
        })
      )}
    </div>
  );
};

export default ProductRender;
