import React, { useState } from "react";
import HKLogo from "../assets/HKLogo.png";
import { useCookies } from "react-cookie";
import { Logout } from "../helper/auth";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setShow }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    setShowMenu(false);
    setShow(true);
  };
  const handleAllProduct = () => {
    setShowMenu(false);
    setShow(false);
  };

  const handleLogout = () => {
    console.log("logout");
    // setShowMenu(false);
    Logout(removeCookie, () => {
      navigate("/login");
      return null;
    });
  };
  return (
    <div className="w-full px-4 md:px-28 py-2 border-b">
      <div className="flex justify-between items-center">
        <img src={HKLogo} alt="logo" className="h-12 w-12" />
        <div>
          <button
            className="hidden md:block px-4 py-2 bg-red-500 text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
          <div className="md:hidden relative">
            <div onClick={() => setShowMenu(!showMenu)}>
              <i className="fa-solid fa-bars cursor-pointer text-xl"></i>
            </div>

            <div
              className={`fixed top-0 right-0 w-[200px] h-screen bg-white shadow-lg transition-transform transform ${
                showMenu ? "translate-x-0" : "translate-x-full"
              } z-20`}
            >
              <div className="p-4 text-right">
                <i
                  class="fa-solid fa-xmark"
                  onClick={() => setShowMenu(false)}
                ></i>
                <ul className="mt-4">
                  <li
                    className="py-2 border-b cursor-pointer hover:text-red-500"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </li>
                  <li
                    className="py-2 border-b cursor-pointer hover:text-red-500"
                    onClick={handleAllProduct}
                  >
                    All Products
                  </li>
                  <li
                    className="py-2 border-b cursor-pointer hover:text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
