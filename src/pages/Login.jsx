import { FaLock, FaRightToBracket, FaUser } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";
import authAPI from "../apis/authAPI";
import AppContext from "../contexts/AppContext/AppContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  useEffect(() => {
    localStorage.setItem("currentUrl", window.location.pathname);
  }, []);
  const { handleLeftSideBarSelectedItem } = useContext(AppContext);
  const logo =
    "https://drive.google.com/uc?export=view&id=1kvFDWul0NlJiF4Pc5fCGAdMqXhWWkUPY";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    userpassword: Yup.string()
      .concat(Yup.string().required("Password is required"))
      .min(5, "Password must be at least 5 characters"),
  });
  const initialValues = {
    username: "",
    userpassword: "",
  };
  async function onSubmit(values) {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login({
        username: values.username,
        password: values.userpassword,
      });

      localStorage.setItem("accessToken", response.data.data.acceptToken);

      const userInfo = await handleLogin();
      if (userInfo.role_id === 1) {
        navigate("/kiots");
        handleLeftSideBarSelectedItem(6);
      } else {
        handleLeftSideBarSelectedItem(1);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container account-body">
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
                        src={logo}
                        height={55}
                        alt="logo"
                        className="auth-logo"
                      />
                    </a>
                  </div>
                  <div className="text-center auth-logo-text">
                    <h4 className="mt-0 mb-3 mt-5">
                      Let's Get Started Brother
                    </h4>
                    <p className="text-muted mb-0">
                      Sign in to continue to Brother.
                    </p>
                  </div>{" "}
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ errors, touched, isSubmitting, setFieldValue }) => {
                      return (
                        <Form className="form-horizontal auth-form my-4">
                          <div className="form-group col">
                            <label>Username</label>
                            <div className="input-group ">
                              <span className="auth-form-icon">
                                <FaUser />
                              </span>
                            </div>
                            <Field
                              name="username"
                              type="text"
                              placeholder="Enter username"
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

                          <div className="form-row">
                            <div className="form-group col">
                              <label>Password</label>
                              <div className="input-group">
                                <span className="auth-form-icon">
                                  <FaLock />
                                </span>
                              </div>
                              <Field
                                name="userpassword"
                                placeholder="Enter password"
                                type="password"
                                className={
                                  "form-control" +
                                  (errors.userpassword && touched.userpassword
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="userpassword"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
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
                              <div className="col-sm-6 text-right">
                                <a
                                  href="auth-recover-pw.html"
                                  className="text-muted font-13"
                                >
                                  <FaLock className="dripicons-lock me-1 mb-1" />
                                  Forgot password?
                                </a>
                              </div>
                            </div>
                            <div className="form-group mb-0 row">
                              <div className="col-12 mt-2">
                                <button
                                  className="btn btn-gradient-primary btn-round btn-block waves-effect waves-light"
                                  type="submit"
                                >
                                  {loading ? "Loading" : "Login"}
                                  <FaRightToBracket className="fas fa-sign-in-alt ml-1" />
                                </button>
                              </div>
                            </div>{" "}
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
                <div className="m-3 text-center text-muted">
                  <p className>
                    Don't have an account ?{" "}
                    <NavLink to="/register" className="text-primary ml-2">
                      Free Resister
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
