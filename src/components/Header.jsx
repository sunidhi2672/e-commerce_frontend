
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getCartProducts = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_WEB_URL}/cart/getProduct`
      );
      const data = await res.json();

      setCartCount(data.length);
    };

    getCartProducts();
  }, []);

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 p-3 sm:p-4 border border-gray-300 shadow-md">

      {/* Logo */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-blue-400 font-extrabold">
        <span className="text-mist-950">Smart</span>Store
      </h1>

      {/* Navigation */}
      <nav className="w-full sm:w-auto">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-8 lg:gap-10 text-base sm:text-lg md:text-xl font-bold items-center">

          <Link to={"/"}>
            <li className="cursor-pointer">Home</li>
          </Link>

          <Link to={"/shop"}>
            <li className="cursor-pointer">Shop</li>
          </Link>

          <Link to={"/about"}>
            <li className="cursor-pointer">About</li>
          </Link>

          <Link to={"/contact"}>
            <li className="cursor-pointer">Contact</li>
          </Link>

        </ul>
      </nav>

      {/* Search and Cart */}
      <div className="flex gap-4 text-2xl sm:text-3xl items-center">

        <FaSearch className="cursor-pointer" />

        <Link to={"/cart"}>
          <p className="cursor-pointer flex items-center">

            <AiOutlineShoppingCart />

            <span className="text-sm ml-1 flex bg-black text-white items-center justify-center font-medium border-2 h-5 w-5 rounded-full">
              {cartCount}
            </span>

          </p>
        </Link>

      </div>

    </div>
  );
};

export default Header;
