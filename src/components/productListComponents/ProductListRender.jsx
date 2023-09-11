import React from "react";
import { useContext } from "react";
import AddProductModal from "./AddProductModal";
import TableList from "./TableList";
import { productPropsContext } from "../productProviderComponents/ProductProvider";

const ProductListRender = () => {
  const productProps = useContext(productPropsContext);
  return (
    <div>
      <AddProductModal />
      {!productProps.currentData.length ? (
        <div className="text-danger">
          There are no prodcuts match with your search. Please choose the
          correct value!
        </div>
      ) : (
        <TableList data={productProps.currentData} />
      )}
    </div>
  );
};

export default ProductListRender;
