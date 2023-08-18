import React from "react";
import LeftSideBar from "./LeftSideBar";
import PageContent from "./PageContent";

const Home = () => {
  return (
    <div className="page-wrapper">
      <LeftSideBar />
      <PageContent />
    </div>
  );
};

export default Home;
