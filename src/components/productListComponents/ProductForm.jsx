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
import kiotAPI from "../../apis/kiotAPI";
import productAPI from "../../apis/productAPI";
import { productListContext } from "../../pages/ProductList";
import imageAPI from "../../apis/imageAPI";
import { productPropsContext } from "../searchComponents/SearchAndPaginaton";

const categories = ["Choose", "EU", "NA", "OC", "AF", "AS", "SA"];

const ProductFrom = ({ setShow, product }) => {
    const { setAlert } = useContext(productListContext);
    const productProps = useContext(productPropsContext);
    const { auth } = useContext(AuthContext);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [kiots, setKiots] = useState([{ _id: "", username: "" }]);

    const [dataInForm, setDataInForm] = useState({});

    const handleSubmitForm = async () => {
        setShowConfirmModal(false);

        const formData = new FormData();
        formData.append("name_file", dataInForm.name_product);
        formData.append("image", dataInForm.image);
        formData.append("kiot_id", dataInForm.kiot_id);

        try {
            setIsLoading(true);
            if (product) {
                //for update product, because create and update modal use a form together
                let dataForUpdateProduct;

                if (dataInForm.image) {
                    const resImage = await imageAPI.createImage(formData);
                    const srcImage = resImage.data.data.imageInfo.src;

                    dataForUpdateProduct = {
                        ...dataInForm,
                        image: srcImage,
                        productId: product._id,
                    };
                }
                if (!dataInForm.image) {
                    dataForUpdateProduct = {
                        ...dataInForm,
                        image: "",
                        productId: product._id,
                    };
                }

                const resProduct = await productAPI.updateProduct(
                    dataForUpdateProduct
                );

                setAlert(true);
                productProps.handleGetAllProduct();
            } else {
                const resImage = await imageAPI.createImage(formData);
                const srcImage = resImage.data.data.imageInfo.src;

                const dataForCreateProduct = { ...dataInForm, image: srcImage };
                const resProduct = await productAPI.createProduct(
                    dataForCreateProduct
                );

                setAlert(true);
                productProps.handleGetAllProduct();
            }
            setShow(false);
        } catch (error) {
            console.log(error);
            setError(
                `${error.response.data.messege}, ${error.response.data.error}`
            );
        } finally {
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            name_product: product ? product.name_product : "",
            category: product ? product.category : "",
            price: product ? product.price : "",
            image: "",
            description: product ? product.description : "",
            kiot_id: product ? product.kiot_id : "",
            active: product ? product.active : true,
        },

        validationSchema: Yup.object({
            name_product: Yup.string()
                .required("Name is required")
                .min(2, "More than 2 characters"),
            category: Yup.string().required("Category is required"),

            price: Yup.string().required("Price is required"),

            image: product
                ? Yup.mixed().notRequired()
                : Yup.mixed().required("Image is required"),
            description: Yup.string().required("Description is required"),
            kiot_id:
                auth.user.role_id === 1
                    ? Yup.string().required("Description is required")
                    : Yup.string().notRequired(),
            active: Yup.boolean().required("Active status is required"),
        }),

        onSubmit: (values) => {
            setDataInForm(values);
            setShowConfirmModal(true);
        },
    });

    useEffect(() => {
        const getKiots = async () => {
            const res = await kiotAPI.getKiot();
            setKiots([{ _id: "", username: "" }, ...res.data.data.kiotList]);
        };

        if (auth.user.role_id === 1) {
            getKiots();
        }
    }, []);

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
                            <p className="text-danger">
                                {formik.errors.name_product}
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Category:</Form.Label>
                        <Form.Select
                            value={formik.values.category}
                            onChange={formik.handleChange}
                        >
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item ? item : "Choose..."}
                                </option>
                            ))}
                        </Form.Select>
                        {formik.errors.category && (
                            <p className="text-danger">
                                {formik.errors.category}
                            </p>
                        )}
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Product's Price ($):</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Product's price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.price && (
                            <p className="text-danger">{formik.errors.price}</p>
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
                            <p className="text-danger">
                                {formik.errors.active}
                            </p>
                        )}
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="image" className="mb-3">
                        <Form.Label>Product's Image:</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                formik.setFieldValue(
                                    "image",
                                    e.target.files[0]
                                );
                            }}
                            accept="image/*"
                        />
                        {formik.errors.image && (
                            <p className="text-danger">{formik.errors.image}</p>
                        )}
                    </Form.Group>
                </Row>

                {auth.user.role_id === 1 && (
                    <Row>
                        <Form.Group as={Col} controlId="kiot_id">
                            <Form.Label>Ki-ot's name:</Form.Label>
                            <Form.Select
                                value={formik.values.kiot_id}
                                onChange={formik.handleChange}
                            >
                                {kiots.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.username
                                            ? item.username
                                            : "Choose..."}
                                    </option>
                                ))}
                            </Form.Select>
                            {formik.errors.kiot_id && (
                                <p className="text-danger">
                                    {formik.errors.kiot_id}
                                </p>
                            )}
                        </Form.Group>
                    </Row>
                )}

                <Row className="mb-3">
                    <Form.Group controlId="description">
                        <Form.Label>Product's Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Product's description"
                            style={{ height: "100px" }}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                        {formik.errors.description && (
                            <p className="text-danger">
                                {formik.errors.description}
                            </p>
                        )}
                    </Form.Group>
                </Row>
                <Row className="d-flex justify-content-end">
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
                                !formik.errors.price &&
                                !formik.errors.image &&
                                !formik.errors.category &&
                                !formik.errors.decription
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
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm information:</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to change product list?</Modal.Body>
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

export default ProductFrom;
