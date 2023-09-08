import { useContext } from "react";
import TableList from "../TableList";
import { saleOffProductListContext } from "./SaleOffProductListProvider";

const SaleOffProductList = () => {
  const SaleOffProductListProps = useContext(saleOffProductListContext);

  return (
    <div className="mt-2">
      <TableList data={SaleOffProductListProps.currentData} />
    </div>
  );
};

export default SaleOffProductList;
