import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // State for search query

  // Load products from localStorage when component mounts
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("List") || "[]");
    setProducts(storedProducts);
  }, []);

  console.log(products, "888");

  const deleteProduct = (productName) => {
    const updatedProducts = products.filter(
      (product) => product.productName !== productName
    );
    setProducts(updatedProducts);
    localStorage.setItem("List", JSON.stringify(updatedProducts));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-65px)] w-full md:min-w-[calc(100vw-300px)] bg-gradient-to-b from-[#894AFF] to-[#B824FF] flex justify-center ">
      <div className="my-8 w-[500px]  px-2">
        <div className="flex border rounded-full overflow-hidden">
          <input
            type="text"
            alt="searchbar"
            placeholder="Search Product Here..."
            className="w-full focus:outline-none px-4 py-2"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="px-4 bg-red-500 text-white">Search</button>
        </div>
        <div className="w-full px-2 mt-4">
          <table className="w-full border">
            <thead>
              <tr className="py-8 bg-gray-800 text-white text-center">
                <td>Sr.</td>
                <td>Product Name</td>
                <td>Price</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="text-gray-800 my-2 bg-white text-center"
                  >
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      {product.productName}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      {product.price}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <i
                        className="fa-solid fa-trash cursor-pointer text-red-500"
                        onClick={() => deleteProduct(product.productName)}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center"
                  >
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
