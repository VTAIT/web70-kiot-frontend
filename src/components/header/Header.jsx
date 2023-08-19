import React, { useContext } from "react";
import NavBar from "./NavBar";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const logo =
  "https://drive.google.com/uc?export=view&id=1kvFDWul0NlJiF4Pc5fCGAdMqXhWWkUPY";

const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    auth.isAuthenticated && (
      <div className="topbar">
        <div className="topbar-left">
          <a href="../dashboard/crm-index.html" className="logo">
            <span>
              <img src={logo} alt="logo-small" className="logo-sm" />
            </span>
            <span>
              <div className="logo-lg">Brother </div>
            </span>
          </a>
        </div>
        <NavBar />
      </div>
    )
  );
};

export default Header;
