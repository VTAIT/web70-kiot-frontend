import { useContext } from "react";
import TableList from "../TableList";
import { saleOffTransactionContext } from "./SaleOffTransactionProvider";

const SaleOffTransactionList = () => {
  const SaleOffTransactionProps = useContext(saleOffTransactionContext);

  return (
    <div className="mt-2">
      <TableList data={SaleOffTransactionProps.currentData} />
    </div>
  );
};

export default SaleOffTransactionList;
