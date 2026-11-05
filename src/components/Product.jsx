
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [productData, setProductData] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const fetchSingleProduct = async () => {
    try {
      const rawData = await fetch(
        `${import.meta.env.VITE_STORE_API}/api/products/${id}`
      );

      const data = await rawData.json();

      setProductData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCartProducts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_WEB_URL}/cart/getProduct`
      );

      const data = await res.json();

      setCartProducts(data);
    } catch (error) {
      console.log("Cart get error:", error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
    getCartProducts();
  }, [id]);

  const addToCart = async () => {
    try {
      const existingProduct = cartProducts.find(
        (item) => item.productIdNumber == productData._id
      );

      const productToAdd = existingProduct
        ? {
            ...existingProduct,
            quantity: existingProduct.quantity + quantity,
          }
        : {
            ...productData,
            quantity: quantity,
          };

      const res = await fetch(
        `${import.meta.env.VITE_WEB_URL}/cart/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productToAdd),
        }
      );

      const data = await res.json();

      console.log("Added to cart:", data);

      if (res.ok) {
        setQuantity(1);
        getCartProducts();
      }
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };

  return (
    <div className="w-full max-w-full px-4 sm:px-6 md:px-8 overflow-x-hidden">

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center md:items-start mt-8 sm:mt-10 mb-10">

        {/* Product Image */}

        <div className="w-full md:w-1/2 flex justify-center">

          <img
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-64 sm:h-80 md:h-96 object-contain border-0 rounded-xl"
            src={productData.image}
            alt={productData.title}
          />

        </div>

        {/* Product Details */}

        <div className="w-full md:w-1/2 flex flex-col items-start">

          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">
            {productData.title}
            <br />
            $ {productData.price}
          </h1>

          <p className="mt-4 w-full text-sm sm:text-base md:text-lg text-mauve-500">
            {productData.description}
          </p>

          <h2 className="font-bold mt-4 text-lg">
            Quantity:
          </h2>

          {/* Quantity Buttons */}

          <div className="font-bold flex gap-1 items-center mt-3">

            <button
              onClick={() =>
                setQuantity((prev) => Math.max(1, prev - 1))
              }
              className="border-2 py-2 sm:py-3 px-4 sm:px-5 text-xl sm:text-2xl border-gray-400"
            >
              -
            </button>

            <div className="border-2 py-2 sm:py-3 px-4 sm:px-5 text-xl sm:text-2xl border-gray-400">
              {quantity}
            </div>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="border-2 py-2 sm:py-3 px-4 sm:px-5 text-xl sm:text-2xl border-gray-400"
            >
              +
            </button>

          </div>

          {/* Add To Cart */}

          <button
            onClick={addToCart}
            className="bg-blue-400 text-white px-6 py-3 rounded-md mt-4 w-full sm:w-auto hover:bg-blue-500"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default Product;
