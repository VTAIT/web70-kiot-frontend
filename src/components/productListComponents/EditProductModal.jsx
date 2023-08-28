import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductFrom from "./ProductForm";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function EditProductModal({ product }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <span
                className="my-1"
                variant="primary"
                onClick={() => setShow(true)}
            >
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
                        Edit Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductFrom setShow={setShow} product={product} />
                </Modal.Body>
            </Modal>
        </>
    );
}
