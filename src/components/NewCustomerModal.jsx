import React, { useContext, useState } from "react";
import BootstrapModal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import customerAPI from "../apis/customerAPI";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext/AuthContext";

const NewCustomerModal = ({ show, handleClose, onUpdateCustomer }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { user } = auth;
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      rank: "",
    },
    onSubmit: async (formsData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await customerAPI.create({
          username: values.username,
          fullName: values.fullName,
          phone: values.phone,
          email: values.email,
          address: values.address,
          gender: values.gender,
          kiot_id: user.kiot_id,
        });
        console.log(response.data);
        onUpdateCustomer();
        navigate("/customers");
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });
  const { handleSubmit, handleChange, values } = formik;
  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>New Customer</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {loading && <p className="text-info">Adding Customer ....</p>}
        <form
          onSubmit={handleSubmit}
          className="form-horizontal auth-form my-4"
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
                value={values.username}
              />
            </div>
          </div>
          {/*end form-group*/}

          <div className="form-group">
            <label htmlFor="fullName">Fullname</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter FullName"
                onChange={handleChange}
                value={values.fullName}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="gender"
                placeholder="Enter Gender"
                onChange={handleChange}
                value={values.gender}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="phone"
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
