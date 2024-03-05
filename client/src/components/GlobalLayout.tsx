import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Headers from "./Headers";

function GlobalLayout() {
  return (
    <div className=" flex flex-col">
      <Headers />
      <Outlet />
      <Footer />
    </div>
  );
}

export default GlobalLayout;
