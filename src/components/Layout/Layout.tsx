import React from "react";
import Navbar from "../Navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode; //👈 children prop typr
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
