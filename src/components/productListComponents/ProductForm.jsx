import { useFormik } from "formik";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as Yup from "yup";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import kiotAPI from "../../apis/kiotAPI";

const categories = ["Choose", "EU", "NA", "OC", "AF", "AS", "SA"];

const ProductFrom = ({ setShow, product }) => {
    const { auth } = useContext(AuthContext);

    const [kiots, setKiots] = useState([{ _id: "", username: "" }]);

    const formik = useFormik({
        initialValues: {
            product_name: product ? product.product_name : "",
            category: product ? product.category : "",
            price: product ? product.price : "",
            image: "",
            description: product ? product.description : "",
            kiot_id: product ? product.kiot_id : "",
        },

        validationSchema: Yup.object({
            product_name: Yup.string()
                .required("Name is required")
                .min(2, "More than 2 characters"),
            category: Yup.string().required("Category is required"),

            price: Yup.string().required("Price is required"),

            // image: Yup.mixed().required("Image is required"),
            description: Yup.string().required("Description is required"),
            kiot_id: Yup.string().required("Description is required"),
        }),

        onSubmit: (values) => {
            setShow(false);
            console.log(values);
        },
    });

    useEffect(() => {
        const getKiots = async () => {
            const res = await kiotAPI.getKiot();
            setKiots((pre) => [...pre, ...res.data.data]);
        };
        getKiots();
    }, []);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="product_name">
                    <Form.Label>Product's Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Product's name"
                        value={formik.values.product_name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.product_name && (
                        <p className="text-danger">
                            {formik.errors.product_name}
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
                        <p className="text-danger">{formik.errors.category}</p>
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
                <Form.Group as={Col} controlId="image" className="mb-3">
                    <Form.Label>Product's Image:</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => {
                            formik.setFieldValue("image", e.target.files[0]);
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
                            !formik.errors.product_name &&
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
    );
};

export default ProductFrom;
