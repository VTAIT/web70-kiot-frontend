import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";
import AppContext from "../contexts/AppContext/AppContext";

const LeftSideBar = () => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;
  const [select, setSelect] = useState(1);
  const { leftSideBarOpen } = useContext(AppContext);
  const selectItem = (select) => {
    // console.log("LeftSideBar", select);
    setSelect(select);
  };

  return (
    isAuthenticated &&
    leftSideBarOpen && (
      <div className="left-sidenav mm-active">
        <ul className="metismenu left-sidenav-menu mm-show">
          <li className={select === 1 ? "mm-active" : ""}>
            <NavLink
              to="/"
              className="nav-link"
              onClick={(e) => {
                // e.preventDefault();
                selectItem(1);
              }}
            >
              <i className="ti-control-record" />
              Products
            </NavLink>
          </li>
          <li className={select === 2 ? "mm-active" : ""}>
            <NavLink
              to="/productList"
              className="nav-link"
              onClick={(e) => {
                // e.preventDefault();
                selectItem(2);
              }}
            >
              <i className="ti-control-record" />
              Product List
            </NavLink>
          </li>
          <li className={select === 3 ? "mm-active" : ""}>
            <NavLink
              to="/customers"
              className="nav-link"
              onClick={(e) => {
                // e.preventDefault();
                selectItem(3);
              }}
            >
              <i className="ti-control-record" />
              Customers
            </NavLink>
          </li>
          {user.username === "admin" && (
            <>
              <li className={select === 4 ? "mm-active" : ""}>
                <NavLink
                  to="/pending-accounts"
                  className="nav-link"
                  onClick={(e) => {
                    // e.preventDefault();
                    selectItem(4);
                  }}
                >
                  <i className="ti-control-record" />
                  Pending Accounts
                </NavLink>
              </li>
              <li className={select === 5 ? "mm-active" : ""}>
                <NavLink
                  to="/accounts"
                  className="nav-link"
                  onClick={(e) => {
                    // e.preventDefault();
                    selectItem(5);
                  }}
                >
                  <i className="ti-control-record" />
                  Accounts
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    )
  );
};

export default LeftSideBar;
