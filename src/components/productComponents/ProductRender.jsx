import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { productPropsContext } from "../productProviderComponents/ProductProvider";
import ProductCart from "./ProductCart";

const ProductRender = () => {
  const productProps = useContext(productPropsContext);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (productProps.currentData.length > 0 || !productProps.isLoading) {
      setDataLoaded(true);
    }
  }, [productProps.currentData, productProps.isLoading]);

  const noProductCheck = (productList) => {
    let isNo = true;
    if (!productList.length) {
      isNo = true;
    }
    productList?.forEach((el) => {
      if (el.active === true) {
        isNo = false;
        return;
      }
    });
    return isNo;
  };

  return (
    <div
      className="grid-product h-product-container over-flow-scroll scrollbar-small "
      style={
        productProps.currentData.length < 4
          ? { justifyContent: "start" }
          : { ustifyContent: "space-between" }
      }
    >
      {dataLoaded && noProductCheck(productProps.currentData) ? (
        <div className="text-danger">There are no products!</div>
      ) : (
        productProps.currentData.map((item) => {
          if (item.active === true) {
            return <ProductCart product={item} key={item._id} />;
          }
        })
      )}
    </div>
  );
};

export default ProductRender;
