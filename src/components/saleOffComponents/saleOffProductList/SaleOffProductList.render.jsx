import { useContext } from "react";
import TableList from "../TableList";
import { saleOffContext } from "../saleOffProvider/SaleOffProvider";

const SaleOffProductList = () => {
  const SaleOffProductListProps = useContext(saleOffContext);

  return (
    <div className="mt-2">
      <TableList data={SaleOffProductListProps.currentData} />
    </div>
  );
};

export default SaleOffProductList;
