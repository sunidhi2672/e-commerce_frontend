import { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Product from "./Product";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart } = useContext(CartContext);

  const [cartProduct, setCartProduct] = useState([]);
  useEffect(() => {
    const getCartProducts = async () => {
      // const res = await fetch("http://localhost:5000/cart/getProduct");
      const res = await fetch(`${import.meta.env.WEB_URL}/cart/getProduct`);
      const data = await res.json();

      if (data) {
        z;
        setCartProduct(data);
      }
    };
    getCartProducts();
  }, []);
  // console.log(cartProduct);

  const [quantity, setQuantity] = useState(1);

  // const decrease = (id) => {
  //   const filterProduct = cartProduct.find((items) => {
  //     return items._id == id;
  //   });
  //   const filterProductNotpresent = cartProduct.filter(
  //     (items) => items._id !== id,
  //   );
  //   console.log(filterProductNotpresent, "telleieiei");

  //   const newCart = {
  //     ...filterProduct,
  //     quantity: filterProduct.quantity <= 1 ? 1 : filterProduct.quantity - 1,
  //   };

  // };

  const decrease = async (id) => {
    const filterProduct = cartProduct.find((item) => {
      return item._id == id;
    });
    const decreasedQuantity = {
      ...filterProduct,
      quantity: filterProduct.quantity <= 1 ? 1 : filterProduct.quantity - 1,
    };
    console.log(decreasedQuantity, "decreased quantity");

    const res = await fetch(`${import.meta.env.WEB_URL}/cart/decrease`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(decreasedQuantity),
    });

    const data = await res.json();

    console.log(data, "backend response");
  };
  // setQuantity(quantity + 1);

  // const increase = async (id) => {
  //   const filterProduct = cartProduct.find((items) => {
  //     items._id == id;
  //   });

  //   // const filterProductNotpresent = cartProduct.filter(
  //   //   (items) => items._id !== id,
  //   // );

  //   const increasedQuantity = { ...filterProduct, quantity: filterProduct.quantity + 1 };

  //   // const increasedQuantity = [newCart, ...filterProductNotpresent];
  //   console.log(increasedQuantity, "increased successfully");
  //   const res = await fetch("http://localhost:5000/cart/increase", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(increasedQuantity),
  //   });
  //   const data = await res.json();
  //   console.log(data, "Backend response");

  // };

  const increase = async (id) => {
    const filterProduct = cartProduct.find((items) => {
      return items._id == id;
    });
    const increasedQuantity = {
      ...filterProduct,
      quantity: filterProduct.quantity + 1,
    };
    console.log(increasedQuantity, "increased successfully");

    const res = await fetch(`${import.meta.env.WEB_URL}/cart/increase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(increasedQuantity),
    });
    const data = await res.json();

    console.log(data, "Backend response");
  };

  const deleteCartItems = async (id) => {
    const res = await fetch(`${import.meta.env.WEB_URL}/cart/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    const data = await res.json();
    const newCartItems = cartProduct.filter((items) => {
      return items._id !== id;
    });
    setCartProduct(newCartItems);
    localStorage.setItem("products", JSON.stringify(newCartItems));
    console.log(data, "deleted successfully");
  };

  // function Home() {
  //   const [quantity, setQuantity] = useState(1);

  //   const increase = () =>{
  //     setQuantity(quantity + 1);
  //   };

  //   const decrease = () => {
  //     if (quantity > 1) {
  //       setQuantity (quantity - 1);
  //     }
  //   };

  //   const removeItem = () => {
  //     alert("Item delete!");
  //   };

  // }

  return (
    <div className="border-0 p-5">
      <>
        {cart.map((product) => (
          <p key={product._id}></p>
        ))}
      </>
      <h1 className="font-bold text-4xl mb-5">My Cart</h1>
      {cartProduct.length === 0 ? (
        "NO cart items"
      ) : (
        <>
          {cartProduct.map((Product) => {
            return (
              <div
                key={Product._id}
                className="flex justify-center gap-15 items-center p-5 w-7xl ml-26 border-2 rounded-l border-gray-400"
              >
                <div className="flex items-center gap-4">
                  <img
                    className=" w-52 h-56 border-0 rounded-xl"
                    // src="https://image.hm.com/assets/hm/fb/1e/fb1ec5f3e79a3009b91bc9f12dc45156f01ded57.jpg?imwidth=768"
                    // alt=""
                    src={Product.image}
                    alt=""
                  />
                </div>
                <p className="text-2xl font-bold ">
                  {Product.title} <br></br>$ {Product.price}{" "}
                </p>

                <div>
                  <div className="font-bold flex gap-1 items-center">
                    <button
                      onClick={() => decrease(Product._id)}
                      className="border-2  py-3 px-5 text-2xl  border-gray-400"
                    >
                      -
                    </button>
                    {/* <span>{item.quantity}</span> */}

                    <div className="border-2  py-3 px-5 text-2xl  border-gray-400">
                      {Product.quantity}
                    </div>
                    <button
                      onClick={() => increase(Product._id)}
                      className="border-2 py-3 px-5 text-2xl  border-gray-400 "
                    >
                      +
                    </button>
                    <span className="text-2xl border-2 border-gray-400  p-2 ml-2">
                      Total price : $ {Product.price * Product.quantity}
                    </span>
                    <RiDeleteBin6Line
                      onClick={() => deleteCartItems(Product._id)}
                      className="text-4xl ml-10"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}

      <div className="flex justify-between border-0 rounded-l bg-gray-200 px-10 py-5 mt-10 bg mx-36">
        <div className="flex-col  ">
          Subtotal <br></br> <br></br> Shipping <br></br>
          <br></br> <span className="font-bold">Total</span>
        </div>
        <div className="flex-col ">
          ${" "}
          {cartProduct.reduce((total, item) => {
            return total + Number(item.price) * Number(item.quantity);
          }, 0)}
          <br></br>
          <br></br>$ 100 <br></br> <br></br>{" "}
          <span className="font-bold">
            ${" "}
            {cartProduct.reduce((total, item) => {
              return total + Number(item.price) * Number(item.quantity);
            }, 0) + 100}
          </span>
        </div>
      </div>

      <button className="border-0 rounded-l bg-blue-400 w-300 h-15 text-white text-xl ml-35 mt-8 mx-36">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
