import React, { useContext, useState } from "react";
import BootstrapModal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import customerAPI from "../apis/customerAPI";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext/AuthContext";

const NewCustomerModal = ({
  show,
  handleClose,
  onUpdateCustomer,
  editedCustomer,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { user } = auth;

  const [submittingStatus, setSubmittingStatus] = useState({});
  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      editedCustomer && editedCustomer.fullName
        ? {
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
          }
        : {
            fullName: "",
            gender: "",
            phone: "",
            email: "",
            address: "",
            rank: "",
          },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        editedCustomer && editedCustomer.fullName
          ? await customerAPI
              .update({
                customerId: editedCustomer._id,
                email: values.email ? values.email : editedCustomer.email,
                fullName: values.fullName
                  ? values.fullName
                  : editedCustomer.fullName,
                phone: values.phone ? values.phone : editedCustomer.phone,
                address: values.address
                  ? values.address
                  : editedCustomer.address,
                gender: values.gender
                  ? values.gender === "male"
                    ? 1
                    : values.gender === "female"
                    ? 2
                    : values.gender === "other" && 3
                  : editedCustomer.gender,
                transaction: editedCustomer.transaction,
                rank: values.rank ? values.rank : editedCustomer.rank,
              })
              .then((res) => {
                if (res.status === 200) {
                  setSubmittingStatus({
                    sent: true,
                    msg: "Customer has been updated successfully!",
                  });
                }
              })
              .catch((err) => {
                setSubmittingStatus({
                  sent: false,
                  msg: `${err}`,
                });
              })
          : await customerAPI.create({
              username: user.username,
              fullName: values.fullName,
              phone: values.phone,
              email: values.email,
              address: values.address,
              gender:
                values.gender === "male"
                  ? 1
                  : values.gender === "female"
                  ? 2
                  : 3,
              kiot_id: user.kiot_id,
            });

        onUpdateCustomer();
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });
  const { handleSubmit, handleChange, values, resetForm } = formik;
  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>New Customer</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {loading &&
          (editedCustomer && editedCustomer.fullName ? (
            <p className="text-info">Editting Customer ....</p>
          ) : (
            <p className="text-info">Adding Customer ....</p>
          ))}
        <form
          onSubmit={handleSubmit}
          className="form-horizontal auth-form my-4"
        >
          {submittingStatus && submittingStatus.msg && (
            <p
              classname={`alert ${
                submittingStatus.sent ? "alert-success" : "alert-error"
              }`}
            >
              {submittingStatus.msg}
            </p>
          )}
          <div className="form-group">
            <label htmlFor="fullName">Fullname</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Enter FullName"
                onChange={handleChange}
                value={values.fullName}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <div className="input-group mb-3">
              {/* <input
                type="text"
                className="form-control"
                id="gender"
                placeholder="Enter Gender"
                onChange={handleChange}
                value={values.gender}
              /> */}

              <select
                class="form-select"
                id="gender"
                name="gender"
                onChange={handleChange}
                value={values.gender}
              >
                <option selected>Please choose the gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter Phone"
                onChange={handleChange}
                value={values.phone}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                value={values.email}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Enter Address"
                onChange={handleChange}
                value={values.address}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rank">Rank</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="rank"
                name="rank"
                placeholder="Enter rank for customer"
                onChange={handleChange}
                value={values.rank}
              />
            </div>
          </div>

          {error && <p className="text-danger">{error}</p>}

          <div class="row col-6 mx-auto mt-5">
            <button
              type="button"
              class="col btn btn-secondary me-2"
              onClick={handleClose}
            >
              Close
            </button>
            <button type="submit" class="col btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </BootstrapModal.Body>
      {/* <BootstrapModal.Footer></BootstrapModal.Footer> */}
    </BootstrapModal>
  );
};

export default NewCustomerModal;
