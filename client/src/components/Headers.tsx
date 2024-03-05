import { UserButton, useUser } from "@clerk/clerk-react";
import { LuPackagePlus } from "react-icons/lu";

import { fontStyles } from "./ui/Font";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

function Headers() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/");
  };

  const handleAddProductButton = () => {
    navigate("/addProduct");
  };

  return (
    <header
      className={`bg-cyan-200 max-w-screen h-[10vh] flex items-center pl-5 justify-between sticky top-0 z-[999] shadow-sm ${fontStyles(
        { intent: "HeadersNav" }
      )}`}
    >
      <div className="rounded-md overflow-hidden">
        <img className="h-[80%] w-20" src={`http://localhost:5000/Logo.png`} />
      </div>

      <div className="flex min-w-20 items-center h-full">
        <div
          onClick={handleHomeButton}
          className="flex gap-2 items-center hover:cursor-pointer h-full px-4  hover:bg-cyan-300 ease-in duration-300"
        >
          Home
        </div>
        <div
          onClick={handleAddProductButton}
          className="flex gap-2 items-center hover:cursor-pointer h-full px-4  hover:bg-cyan-300 ease-in duration-300"
        >
          <LuPackagePlus className="w-8 h-8 text-white" />
          Add Product
        </div>
        <Cart />
        <div className="flex gap-2 items-center hover:cursor-pointer h-full px-4  hover:bg-cyan-300 ease-in duration-300">
          <UserButton /> {user!.firstName}
        </div>
        {/* <UserProfile /> */}
      </div>
    </header>
  );
}

export default Headers;
