import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatPopup from "../components/chatPopup/ChatPopup";

const Layout = () => {
  return (
    <>
      <NavBar></NavBar>
      <main>
        <Outlet />
      </main>
      <ChatPopup />
      <Footer />
    </>
  );
};

export default Layout;
