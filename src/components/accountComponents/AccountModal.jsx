import React, { useState } from "react";
import BootstrapModal from "react-bootstrap/Modal";
import accountAPI from "../../apis/accountAPI";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const AccountModal = ({
  show,
  handleClose,
  onUpdateAccount,
  editedAccount,
  isAddMode,
}) => {
  const initialValues = isAddMode
    ? {
        username: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: "",
      }
    : editedAccount && {
        username: editedAccount.username,
        fullName: editedAccount.fullName,
        email: editedAccount.email,
        phone: editedAccount.phone,
        address: editedAccount.address,
        password: "",
        confirmPassword: "",
        role: editedAccount.role_id === "2" ? "owner" : "employee",
      };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    role: Yup.string(),
    password: Yup.string()
      .concat(isAddMode ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        // if (password || isAddMode)
        if (isAddMode) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setStatus();
    if (isAddMode) {
      createUser(fields, setSubmitting, resetForm);
      onUpdateAccount();
    } else {
      updateUser(fields, setSubmitting);
      onUpdateAccount();
    }
  }

  async function createUser(fields, setSubmitting, resetForm) {
    resetForm();
    await accountAPI
      .create(fields)
      .then(() => {
        onUpdateAccount({ status: 1, message: "User is added successfully!" });
        handleClose();
      })
      .catch((error) => {
        setSubmitting(false);
        onUpdateAccount({ status: 0, message: "Error in adding user!" });
        // handleClose()
        console.log(error);
      });
  }

  async function updateUser(fields, setSubmitting) {
    const setfields = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v != null)
    );
    const updatedFields = {
      ...editedAccount,
      ...setfields,
      userId: editedAccount._id,
    };
    await accountAPI
      .update(updatedFields)
      .then(() => {
        onUpdateAccount({
          status: 1,
          message: "User is editted successfully!",
        });
        handleClose();
      })
      .catch((error) => {
        setSubmitting(false);
        onUpdateAccount({ status: 0, message: "Error in editting user!" });
      });
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {editedAccount ? "Edit Account" : "Add Account"}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {loading &&
          (editedAccount && editedAccount.fullName ? (
            <p className="text-info">Editting Account ....</p>
          ) : (
            <p className="text-info">Adding Account ....</p>
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
                    <label>Username</label>
                    <Field
                      name="username"
                      type="text"
                      className={
                        "form-control" +
                        (errors.username && touched.username
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="username"
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
                    <label>Full Name</label>
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
                  {/* <div className="form-group col">
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
                      name="title"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div> */}

                  <div className="form-group col">
                    <label>Role</label>
                    <Field
                      name="role"
                      as="select"
                      className={
                        "form-control" +
                        (errors.role && touched.role ? " is-invalid" : "")
                      }
                    >
                      <option value=""></option>
                      <option value="owner">Owner</option>
                      <option value="employee">Employee</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                {!isAddMode && (
                  <div>
                    <h3 className="pt-3">Change Password</h3>
                    <p>Leave blank to keep the same password</p>
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group col">
                    <label>
                      Password
                      {/* {!isAddMode &&
                        (!showPassword ? (
                          <span>
                            {" "}
                            -{" "}
                            <a
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-primary"
                            >
                              Show
                            </a>
                          </span>
                        ) : (
                          <span> - {user.password}</span>
                        ))} */}
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group col">
                    <label>Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={
                        "form-control" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
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

export default AccountModal;
