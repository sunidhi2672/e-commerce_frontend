
import { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart } = useContext(CartContext);
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    const getCartProducts = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_WEB_URL}/cart/getProduct`
      );
      const data = await res.json();

      if (data) {
        setCartProduct(data);
      }
    };

    getCartProducts();
  }, []);

  const decrease = async (id) => {
    const filterProduct = cartProduct.find(
      (item) => item._id === id
    );

    if (!filterProduct || filterProduct.quantity <= 1) return;

    const decreasedQuantity = {
      ...filterProduct,
      quantity: filterProduct.quantity - 1,
    };

    const res = await fetch(
      `${import.meta.env.VITE_WEB_URL}/cart/decrease`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(decreasedQuantity),
      }
    );

    if (res.ok) {
      setCartProduct((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, quantity: decreasedQuantity.quantity }
            : item
        )
      );
    }
  };

  const increase = async (id) => {
    const filterProduct = cartProduct.find(
      (item) => item._id === id
    );

    if (!filterProduct) return;

    const increasedQuantity = {
      ...filterProduct,
      quantity: filterProduct.quantity + 1,
    };

    const res = await fetch(
      `${import.meta.env.VITE_WEB_URL}/cart/increase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(increasedQuantity),
      }
    );

    if (res.ok) {
      setCartProduct((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, quantity: increasedQuantity.quantity }
            : item
        )
      );
    }
  };

  const deleteCartItems = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_WEB_URL}/cart/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      }
    );

    if (res.ok) {
      const newCartItems = cartProduct.filter(
        (item) => item._id !== id
      );

      setCartProduct(newCartItems);
      localStorage.setItem(
        "products",
        JSON.stringify(newCartItems)
      );
    }
  };

  const subtotal = cartProduct.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  return (
    <div className="w-full max-w-full p-3 sm:p-5 md:p-8 overflow-x-hidden">

      <h1 className="font-bold text-3xl sm:text-4xl mb-5">
        My Cart
      </h1>

      {cartProduct.length === 0 ? (
        <p className="text-lg text-gray-500">NO cart items</p>
      ) : (
        <div className="flex flex-col gap-5">

          {cartProduct.map((Product) => (
            <div
              key={Product._id}
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 lg:gap-8 items-center p-4 sm:p-5 w-full max-w-6xl mx-auto border-2 rounded-xl border-gray-400"
            >

              <img
                className="w-40 h-40 sm:w-44 sm:h-44 lg:w-52 lg:h-52 object-contain rounded-xl"
                src={Product.image}
                alt={Product.title}
              />

              <div className="flex-1 text-center sm:text-left">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                  {Product.title}
                </p>

                <p className="text-lg sm:text-xl font-semibold mt-2">
                  $ {Product.price}
                </p>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-2">

                <button
                  onClick={() => decrease(Product._id)}
                  className="border-2 py-2 px-4 sm:px-5 text-xl sm:text-2xl border-gray-400"
                >
                  -
                </button>

                <div className="border-2 py-2 px-4 sm:px-5 text-xl sm:text-2xl border-gray-400">
                  {Product.quantity}
                </div>

                <button
                  onClick={() => increase(Product._id)}
                  className="border-2 py-2 px-4 sm:px-5 text-xl sm:text-2xl border-gray-400"
                >
                  +
                </button>

                <p className="text-base sm:text-lg lg:text-xl border-2 border-gray-400 p-2">
                  Total: $ {Product.price * Product.quantity}
                </p>

                <RiDeleteBin6Line
                  onClick={() => deleteCartItems(Product._id)}
                  className="text-3xl sm:text-4xl cursor-pointer"
                />

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtotal Section */}

      <div className="flex justify-between gap-4 border-0 rounded-xl bg-gray-200 px-4 sm:px-8 md:px-10 py-5 mt-8 w-full max-w-6xl mx-auto">

        <div className="flex flex-col gap-4">
          <span>Subtotal</span>
          <span>Shipping</span>
          <span className="font-bold">Total</span>
        </div>

        <div className="flex flex-col gap-4 text-right">
          <span>$ {subtotal.toFixed(2)}</span>
          <span>$ 100</span>
          <span className="font-bold">
            $ {(subtotal + 100).toFixed(2)}
          </span>
        </div>

      </div>

      <button className="border-0 rounded-xl bg-blue-400 w-full max-w-6xl h-14 sm:h-15 text-white text-lg sm:text-xl mt-6 block mx-auto">
        Proceed to Checkout
      </button>

    </div>
  );
}

export default Cart;
