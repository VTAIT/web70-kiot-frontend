import axios from "axios";
// import { response } from "express";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      userpassword: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post(
          "http://localhost:3001/api/v1/auth/login",
          {
            username: values.username,
            password: values.userpassword,
          }
        );
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/");
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
    <div className="container">
      <div className="row vh-100 ">
        <div className="col-12 align-self-center">
          <div className="auth-page">
            <div className="card auth-card shadow-lg">
              <div className="card-body">
                <div className="px-3">
                  <div className="auth-logo-box">
                    <a
                      href="../dashboard/analytics-index.html"
                      className="logo logo-admin"
                    >
                      <img
                        src="../assets/images/logo-sm.png"
                        height={55}
                        alt="logo"
                        className="auth-logo"
                      />
                    </a>
                  </div>
                  {/*end auth-logo-box*/}
                  <div className="text-center auth-logo-text">
                    <h4 className="mt-0 mb-3 mt-5">
                      Let's Get Started Brother
                    </h4>
                    <p className="text-muted mb-0">
                      Sign in to continue to Brother.
                    </p>
                  </div>{" "}
                  {/*end auth-logo-text*/}
                  <form
                    onSubmit={handleSubmit}
                    className="form-horizontal auth-form my-4"
                    action="index.html"
                  >
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <div className="input-group mb-3">
                        <span className="auth-form-icon">
                          <i className="dripicons-user" />
                        </span>
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
                      <label htmlFor="userpassword">Password</label>
                      <div className="input-group mb-3">
                        <span className="auth-form-icon">
                          <i className="dripicons-lock" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                          onChange={handleChange}
                          value={values.userpassword}
                        />
                      </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    {/*end form-group*/}
                    <div className="form-group row mt-4">
                      <div className="col-sm-6">
                        <div className="custom-control custom-switch switch-success">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitchSuccess"
                          />
                          <label
                            className="custom-control-label text-muted"
                            htmlFor="customSwitchSuccess"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-sm-6 text-right">
                        <a
                          href="auth-recover-pw.html"
                          className="text-muted font-13"
                        >
                          <i className="dripicons-lock" /> Forgot password?
                        </a>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end form-group*/}
                    <div className="form-group mb-0 row">
                      <div className="col-12 mt-2">
                        <button
                          className="btn btn-primary btn-round btn-block waves-effect waves-light"
                          type="submit"
                        >
                          {loading ? "Loading" : "Login"}
                          <i className="fas fa-sign-in-alt ml-1" />
                        </button>
                      </div>
                      {/*end col*/}
                    </div>{" "}
                    {/*end form-group*/}
                  </form>
                  {/*end form*/}
                </div>
                {/*end /div*/}
                <div className="m-3 text-center text-muted">
                  <p className>
                    Don't have an account ?{" "}
                    <a
                      href="../authentication/auth-register.html"
                      className="text-primary ml-2"
                    >
                      Free Resister
                    </a>
                  </p>
                </div>
              </div>
              {/*end card-body*/}
            </div>
            {/*end card*/}
            <div className="account-social text-center mt-4">
              <h6 className="my-4">Or Login With</h6>
              <ul className="list-inline mb-4">
                <li className="list-inline-item">
                  <a href className>
                    <i className="fab fa-facebook-f facebook" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href className>
                    <i className="fab fa-twitter twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href className>
                    <i className="fab fa-google google" />
                  </a>
                </li>
              </ul>
            </div>
            {/*end account-social*/}
          </div>
          {/*end auth-page*/}
        </div>
        {/*end col*/}
      </div>
      {/*end row*/}
    </div>
  );
};

export default Login;
