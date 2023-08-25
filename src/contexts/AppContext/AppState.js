import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = ({ children }) => {
  const [leftSideBarOpen, setLeftSideBarOpen] = useState(true);

  const handleLeftSideBarStatus = (select) => {
    setLeftSideBarOpen(select);
  };

  return (
    <AppContext.Provider
      value={{
        leftSideBarOpen,
        handleLeftSideBarStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
