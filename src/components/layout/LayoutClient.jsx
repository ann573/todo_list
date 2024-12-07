import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
const LayoutClient = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutClient;
