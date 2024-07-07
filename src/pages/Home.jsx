import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import AddProducts from "./AddProducts";
import AllProducts from "./AllProducts";

const Home = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <NavBar setShow={setShow} show={show} />
      <div className=" w-full md:flex">
        <aside className="hidden md:block min-h-[calc(100vh-65px)]  w-[300px]">
          <i className="fa-solid fa-user ml-28 mt-12 text-5xl"></i>
          <div className="grid  grid-rows-1 mt-2 ">
            <button
              className="px-2 py-2 hover:bg-red-100"
              onClick={() => setShow(true)}
            >
              Add Product
            </button>
            <button
              className="px-2 py-2 hover:bg-red-100"
              onClick={() => setShow(false)}
            >
              All Products
            </button>
          </div>
        </aside>
        <main>{show ? <AddProducts /> : <AllProducts />}</main>
      </div>
    </div>
  );
};

export default Home;
