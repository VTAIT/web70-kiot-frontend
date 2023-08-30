import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import ProductFrom from "./ProductForm";

export default function AddProductModal({ handleGetAllProduct }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                className="my-1 d-flex align-items-center"
                variant="primary"
                onClick={() => setShow(true)}
            >
                <span>Add New</span>
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
                        Add New Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductFrom
                        setShow={setShow}
                        handleGetAllProduct={handleGetAllProduct}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
