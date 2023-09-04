import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import AppContext from "../../contexts/AppContext/AppContext";
import leftNavBarItems from "../../global/leftNavBarItems";
import LeftSideBarItem from "./LeftSideBarItem";
const LeftSideBar = () => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;
  const { leftSideBarOpen } = useContext(AppContext);

  return (
    isAuthenticated &&
    leftSideBarOpen && (
      <div className="left-sidenav mm-active">
        <ul className="metismenu left-sidenav-menu mm-show">
          {leftNavBarItems.map((item) => {
            return item.adminOnly
              ? user.role_id === 1 && <LeftSideBarItem item={item} />
              : user.role_id !== 1 && <LeftSideBarItem item={item} />;
          })}
        </ul>
      </div>
    )
  );
};

export default LeftSideBar;
