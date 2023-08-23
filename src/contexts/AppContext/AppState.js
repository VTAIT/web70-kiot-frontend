import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = ({ children }) => {
  const [select, setSelect] = useState(0);

  const selectItem = (select) => {
    console.log("LeftSideBar", select);
    setSelect(select);
  };

  return (
    <AppContext.Provider
      value={{
        select,
        selectItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
