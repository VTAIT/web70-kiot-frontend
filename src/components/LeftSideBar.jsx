import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";

const LeftSideBar = () => {
  const { auth } = useContext(AuthContext);
  const [select, setSelect] = useState(1);

  const selectItem = (select) => {
    console.log("LeftSideBar", select);
    setSelect(select);
  };

  return (
    auth.isAuthenticated && (
      <div className="left-sidenav mm-active">
        <ul className="metismenu left-sidenav-menu mm-show">
          {/* <li className={select === 0 ? "mm-active" : ""}>
        <NavLink
            className="nav-link "
            onClick={(e) => {
              e.preventDefault();
              selectItem(0);
            }}
          >
            <i className="ti-control-record" />
            Analytics
          </NavLink>
        </li> */}
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
        </ul>
      </div>
    )
  );
};

export default LeftSideBar;
