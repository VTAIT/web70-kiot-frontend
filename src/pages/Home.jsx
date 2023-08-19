import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import PageContent from "../components/PageContent";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <LeftSideBar />
      <PageContent />
    </div>
  );
};

export default Home;
