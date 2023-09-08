import React, { createContext, useState } from "react";
import { Accordion, Toast, ToastContainer } from "react-bootstrap";
import SaleOffProductListProvider from "../components/saleOffComponents/saleOffProductList/SaleOffProductListProvider";
import SaleOffTransactionProvider from "../components/saleOffComponents/saleOffTransaction/SaleOffTransactionProvider";
import SaleOffProductList from "../components/saleOffComponents/saleOffProductList/SaleOffProductList.render";
import SaleOffTransactionList from "../components/saleOffComponents/saleOffTransaction/saleOffTransaction.render";
import AddSaleOffModal from "../components/saleOffComponents/AddSaleOffModal";

export const saleOffsContext = createContext();

const SaleOffs = () => {
  const [alert, setAlert] = useState(false);

  return (
    <saleOffsContext.Provider value={{ setAlert }}>
      <div className="page-content">
        <AddSaleOffModal />
        <Accordion flush className="m-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Product's Promotions</Accordion.Header>
            <Accordion.Body>
              <SaleOffProductListProvider>
                <SaleOffProductList />
              </SaleOffProductListProvider>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Transaction's Promotions</Accordion.Header>
            <Accordion.Body>
              <SaleOffTransactionProvider>
                <SaleOffTransactionList />
              </SaleOffTransactionProvider>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 999 }}
      >
        <Toast
          show={alert}
          onClose={() => setAlert(false)}
          bg="success"
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Alert</strong>
            <small>Just now!</small>
          </Toast.Header>
          <Toast.Body>
            Update saleOff list successfull! Press search to refresh list!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </saleOffsContext.Provider>
  );
};

export default SaleOffs;
