import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AddProductModal from "./AddProductModal";
import TableList from "./TableList";
import { productPropsContext } from "../productProviderComponents/ProductProvider";

const ProductListRender = () => {
  const productProps = useContext(productPropsContext);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (productProps.currentData.length > 0 || !productProps.isLoading) {
      setDataLoaded(true);
    }
  }, [productProps.currentData, productProps.isLoading]);

  return (
    <div>
      <AddProductModal />
      {dataLoaded && !productProps.currentData.length ? (
        <div className="text-danger">There are no prodcuts!</div>
      ) : (
        <TableList data={productProps.currentData} />
      )}
    </div>
  );
};

export default ProductListRender;
