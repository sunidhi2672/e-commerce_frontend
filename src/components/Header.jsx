import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cart } = useContext(CartContext);
const [cartCount, setCartCount] = useState([]);
useEffect(()=>{
  
 const getCartProducts = async () => {
      const res = await fetch(`${import.meta.env.WEB_URL}/cart/getProduct`);
      const data = await res.json();

      setCartCount(data.length)
 };
 getCartProducts();
},[])

  return (
    <div className="flex justify-between items-center p-3 border border-gray-300 shadow-md w-full sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 max-w-full px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-sm sm:text-base md:text-lg lg:text-xl">
      <h1 className="text-5xl text-blue-400 font-extrabold">
        <span className="text-mist-950">Smart</span>Store
      </h1>
      <nav className="text-l font-bold">
        <ul className="flex gap-10 text-2xl items-center pr-20">
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
          {/* <Link to={"/cart"}>
          <li className="cursor-pointer">Cart</li>
          </Link> */}
        </ul>
      </nav>

      <div className="flex gap-3 text-3xl">
        <FaSearch />
        <Link to={"/cart"}>
          <p className="cursor-pointer flex ">
            <AiOutlineShoppingCart />
            <span className="text-sm pl-1 flex bg-black text-white items-center font-medium border-2 mr-2 h-5 w-5 rounded-full">
              {cartCount}
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
