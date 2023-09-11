import React, { createContext, useState } from "react";
import { Accordion, Toast, ToastContainer } from "react-bootstrap";
import SaleOffProductList from "../components/saleOffComponents/saleOffProductList/SaleOffProductList.render";
import SaleOffTransactionList from "../components/saleOffComponents/saleOffTransaction/saleOffTransaction.render";
import AddSaleOffModal from "../components/saleOffComponents/AddSaleOffModal";
import SaleOffProvider from "../components/saleOffComponents/saleOffProvider/SaleOffProvider";
import Search from "../components/saleOffComponents/saleOffProvider/Search";

export const saleOffsContext = createContext();

const SaleOffs = () => {
  const [alert, setAlert] = useState(false);

  return (
    <saleOffsContext.Provider value={{ setAlert }}>
      <div className="page-content container-fluid">
        <Search />
        <Accordion flush className="m-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="promotion-title">Product's Promotions</div>
            </Accordion.Header>
            <Accordion.Body>
              <SaleOffProvider type={1} perPage={5}>
                <AddSaleOffModal />
                <SaleOffProductList />
              </SaleOffProvider>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="promotion-title">Transaction's Promotions</div>
            </Accordion.Header>
            <Accordion.Body>
              <SaleOffProvider type={2} perPage={5}>
                <AddSaleOffModal />
                <SaleOffTransactionList />
              </SaleOffProvider>
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
            Update saleOff list successfull! Please reload to update data!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </saleOffsContext.Provider>
  );
};

export default SaleOffs;
