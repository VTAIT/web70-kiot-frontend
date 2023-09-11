import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import SaleOffForm from "./SaleOffForm";

export default function AddSaleOffModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        className="mx-2 d-flex align-items-center"
        style={{ width: "fit-content" }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        <span>Add Promotion</span>
        <MdOutlineAddCircleOutline className="text-light mx-1 fs-5" />
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add New Promotion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaleOffForm setShow={setShow} />
        </Modal.Body>
      </Modal>
    </>
  );
}
