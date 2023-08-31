import React, { useContext, useState } from "react";
import BootstrapModal from "react-bootstrap/Modal";
import customerAPI from "../../apis/customerAPI";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../../contexts/AuthContext/AuthContext";


const CustomerModal = ({
  show,
  handleClose,
  onUpdateCustomer,
  editedCustomer,
  isAddMode,
}) => {
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const { user } = auth;

  const initialValues = isAddMode
    ? {
        fullName: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        rank: "",
      }
    : editedCustomer && {
        fullName: editedCustomer.fullName,
        gender:
          editedCustomer.gender === 1
            ? "male"
            : editedCustomer.gender === 2
            ? "female"
            : "other",
        phone: editedCustomer.phone,
        email: editedCustomer.email,
        address: editedCustomer.address,
        rank: editedCustomer.rank,
      };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string(),
    address: Yup.string().required("Address is required"),
    rank: Yup.number(),
  });
  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setStatus();
    if (isAddMode) {
      createCustomer(fields, setSubmitting, resetForm);
      onUpdateCustomer();
    } else {
      updateCustomer(fields, setSubmitting);
      onUpdateCustomer();
    }
  }

  async function createCustomer(fields, setSubmitting, resetForm) {
    resetForm();
    const newCustomer = {
      ...fields,
      kiot_id: user.kiot_id,
      username: user.username,
      gender: fields.gender === "male" ? 1 : fields.gender === "female" ? 2 : 3,
    };
    console.log(newCustomer);
    await customerAPI
      .create(newCustomer)
      .then(() => {
        onUpdateCustomer({
          status: 1,
          message: "Customer is added successfully!",
        });
        handleClose();
      })
      .catch((error) => {
        setSubmitting(false);
        onUpdateCustomer({ status: 0, message: error.response.data.error });
        handleClose();
        console.log(error.response.data.error);
      });
  }

  async function updateCustomer(fields, setSubmitting) {
    const setfields = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v != null)
    );
    const updatedFields = {
      ...editedCustomer,
      ...setfields,
      customerId: editedCustomer._id,
      gender: fields.gender === "male" ? 1 : fields.gender === "female" ? 2 : 3,
    };
   
    await customerAPI
      .update(updatedFields)
      .then(() => {
        handleClose();
        onUpdateCustomer({
          status: 1,
          message: "Customer is editted successfully!",
        });
      })
      .catch((error) => {
        setSubmitting(false);
        handleClose();
        onUpdateCustomer({ status: 0, message: error.response.data.error });
      });
  }

  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {editedCustomer ? "Edit Customer" : "Add Customer"}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {loading &&
          (editedCustomer && editedCustomer.fullName ? (
            <p className="text-info">Editting Customer ....</p>
          ) : (
            <p className="text-info">Adding Customer ....</p>
          ))}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => {
            return (
              <Form>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Fullname</label>
                    <Field
                      name="fullName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.fullName && touched.fullName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Gender</label>
                    <Field
                      name="gender"
                      as="select"
                      className={
                        "form-control" +
                        (errors.gender && touched.gender ? " is-invalid" : "")
                      }
                    >
                      <option value=""></option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="other">other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <label>Phone</label>
                    <Field
                      name="phone"
                      type="text"
                      className={
                        "form-control" +
                        (errors.phone && touched.phone ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Address</label>
                    <Field
                      name="address"
                      type="text"
                      className={
                        "form-control" +
                        (errors.address && touched.address ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Rank</label>
                    <Field
                      name="rank"
                      type="text"
                      className={
                        "form-control" +
                        (errors.rank && touched.rank ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="rank"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="form-group text-center">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn btn-secondary me-2"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Save
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </BootstrapModal.Body>
      {/* <BootstrapModal.Footer></BootstrapModal.Footer> */}
    </BootstrapModal>
  );
};

export default CustomerModal;
