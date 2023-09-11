import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaRegPenToSquare } from "react-icons/fa6";
import SaleOffForm from "./SaleOffForm";

export default function EditSaleOffModal({ saleOff }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <span className="my-1" variant="primary" onClick={() => setShow(true)}>
        <FaRegPenToSquare className="text-info ms-2" />
      </span>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Promotion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaleOffForm setShow={setShow} saleOff={saleOff} />
        </Modal.Body>
      </Modal>
    </>
  );
}
