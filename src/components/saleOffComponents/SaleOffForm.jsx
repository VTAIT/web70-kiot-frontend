import { useFormik } from "formik";
import { useContext } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as Yup from "yup";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { saleOffsContext } from "../../pages/SaleOffs";
import { useSearchParams } from "react-router-dom";
import saleOffAPI from "../../apis/saleOffAPI";
import { saleOffContext } from "./saleOffProvider/SaleOffProvider";

const SaleOffForm = ({ setShow, saleOff }) => {
  const { setAlert } = useContext(saleOffsContext);
  const { handleGetAllSaleoff, type } = useContext(saleOffContext);
  const { auth } = useContext(AuthContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentKiot = searchParams.get("kiotId")
    ? searchParams.get("kiotId")
    : auth.user.kiot_id;
  const [dataInForm, setDataInForm] = useState({});

  const handleSubmitForm = async () => {
    setShowConfirmModal(false);
    if (saleOff) {
      const newDataInForm = { ...dataInForm, saleOffId: saleOff._id };
      try {
        setIsLoading(true);
        const res = await saleOffAPI.updateSaleoff(newDataInForm);
        setAlert(true);
        setShow(false);
        handleGetAllSaleoff();
      } catch (error) {
        setError(
          `${error.response.data.messege}, ${error.response.data.error}`
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const res = await saleOffAPI.createSaleoff(dataInForm);
        setAlert(true);
        setShow(false);
        handleGetAllSaleoff();
      } catch (error) {
        setError(
          `${error.response.data.messege}, ${error.response.data.error}`
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name_product: saleOff ? saleOff.name_product : "",
      rate: saleOff ? saleOff.price : "",
      kiot_id: currentKiot || "",
      active: saleOff ? saleOff.active : true,
      type: saleOff ? saleOff.type : type,
    },

    validationSchema: Yup.object({
      name_product: Yup.string()
        .required("Name is required")
        .min(2, "More than 2 characters"),

      rate: Yup.number().required("Rate is required"),

      kiot_id: Yup.string().required("Kiot is required"),

      active: Yup.boolean().required("Active status is required"),

      type: Yup.number().required("Type status is required"),
    }),

    onSubmit: (values) => {
      setDataInForm(values);
      setShowConfirmModal(true);
    },
  });

  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle text-danger">
        {error}
      </div>
    );
  }

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name_product">
            <Form.Label>Product's Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product's name"
              value={formik.values.name_product}
              onChange={formik.handleChange}
            />
            {formik.errors.name_product && (
              <p className="text-danger">{formik.errors.name_product}</p>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="rate">
            <Form.Label>Product's promotion rate (%):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Promotion rate"
              value={formik.values.rate}
              onChange={formik.handleChange}
            />
            {formik.errors.rate && (
              <p className="text-danger">{formik.errors.rate}</p>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="active">
            <Form.Label>Active:</Form.Label>
            <Form.Select
              value={formik.values.active}
              onChange={formik.handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Select>
            {formik.errors.active && (
              <p className="text-danger">{formik.errors.active}</p>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="kiot_id">
            <Form.Label>Ki-ot's ID:</Form.Label>
            <Form.Select
              value={formik.values.kiot_id}
              onChange={formik.handleChange}
            >
              <option value="">Choose...</option>
              <option value={currentKiot}>{currentKiot}</option>
            </Form.Select>
            {formik.errors.kiot_id && (
              <p className="text-danger">{formik.errors.kiot_id}</p>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="type">
            <Form.Label>Type:</Form.Label>
            <Form.Select
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <option value={1}>Product</option>
              <option value={2}>Transaction</option>
            </Form.Select>
            {formik.errors.type && (
              <p className="text-danger">{formik.errors.type}</p>
            )}
          </Form.Group>
        </Row>

        <Row className="d-flex justify-content-end my-3">
          <Button
            style={{ width: "fit-content" }}
            variant="secondary"
            onClick={() => setShow(false)}
          >
            No
          </Button>
          <Button
            style={{
              border: "none",
              width: "fit-content",
              margin: "0px 10px",
              background:
                !formik.errors.name_product &&
                !formik.errors.rate &&
                !formik.errors.type &&
                !formik.errors.kiot_id &&
                !formik.errors.active
                  ? "linear-gradient(to right, rgb(37, 106, 253), rgba(37, 106, 253,0.6))"
                  : "linear-gradient(to right, rgb(128, 128, 128), rgba(128, 128, 128,0.6))",
            }}
            type="submit"
          >
            Yes
          </Button>
        </Row>
      </Form>

      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm information:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to change promotion list?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(true);
              setShowConfirmModal(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaleOffForm;
