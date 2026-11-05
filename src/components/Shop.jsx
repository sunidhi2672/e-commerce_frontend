
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Shop() {
  const [storeData, setStoreData] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  // Get Cart Products
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_WEB_URL}/cart/getProduct`
        );

        const data = await res.json();

        if (data) {
          setCartProducts(data);
        }
      } catch (error) {
        console.log("Cart Error:", error);
      }
    };

    getProduct();
  }, []);

  // Get Store Products
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const rawData = await fetch(
          `${import.meta.env.VITE_STORE_API}/api/products`,
          {
            method: "GET",
          }
        );

        const data = await rawData.json();

        setStoreData(data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchStore();
  }, []);

  // Navigate Product
  const handleNavigateProduct = (_id) => {
    navigate(`/product/${_id}`);
  };

  // Add To Cart
  // const addToCart = async (productData) => {
  //   try {
  //     const existingProduct = cartProducts.find(
  //       (item) => item.productId == productData._id
  //     );

  //     let productToSave;

  //     if (existingProduct) {
  //       productToSave = {
  //         ...existingProduct,
  //         quantity: existingProduct.quantity + 1,
  //       };
  //     } else {
  //       productToSave = {
  //         ...productData,
  //         productId: productData._id,
  //         quantity: 1,
  //       };
  //     }

  //     const res = await fetch(
  //       `${import.meta.env.VITE_WEB_URL}/cart/create`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(productToSave),
  //       }
  //     );

  //     if (!res.ok) {
  //       throw new Error("Product add nahi hua");
  //     }

  //     const data = await res.json();

  //     console.log("Backend response:", data);

  //     // Refresh cart products
  //     const cartRes = await fetch(
  //       `${import.meta.env.VITE_WEB_URL}/cart/getProduct`
  //     );

  //     const updatedCart = await cartRes.json();

  //     setCartProducts(updatedCart);

  //     alert("Product added to cart!");

  //   } catch (error) {
  //     console.log("Add to cart error:", error);
  //   }
  // };
const addToCart = async (productData) => {
  try {
    console.log("Selected Product:", productData);

    const res = await fetch(
      `${import.meta.env.VITE_WEB_URL}/cart/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
          productIdNumber: productData._id,
          quantity: 1,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Product add failed");
    }

    console.log("Backend Response:", data);

    const cartRes = await fetch(
      `${import.meta.env.VITE_WEB_URL}/cart/getProduct`
    );

    if (!cartRes.ok) {
      throw new Error("Cart fetch failed");
    }

    const updatedCart = await cartRes.json();

    setCartProducts(updatedCart);

    alert("Product added successfully!");

  } catch (error) {
    console.log("Add to cart error:", error);
  }
};
  return (
    <div className="min-h-screen w-full max-w-full bg-gray-100 py-5 sm:py-8 overflow-x-hidden">

      {/* Heading */}

      <h2 className="text-2xl sm:text-3xl font-bold px-4 sm:px-6 mb-6 sm:mb-8">
        All Products
      </h2>

      {/* Products Grid */}

      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 px-3 sm:px-5 md:px-6">

        {storeData.map((productObj) => (

          <div
            key={productObj._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >

            {/* Image */}

            <div className="w-full h-56 sm:h-60 md:h-64 flex items-center justify-center bg-white p-4 sm:p-5">

              <img
                className="w-full h-full object-contain cursor-pointer"
                src={productObj.image}
                alt={productObj.title}
                onClick={() =>
                  handleNavigateProduct(productObj._id)
                }
              />

            </div>

            {/* Card Content */}

            <div className="p-3 sm:p-4">

              <h3 className="font-semibold text-base sm:text-lg line-clamp-2 min-h-12 sm:min-h-14">
                {productObj.title}
              </h3>

              <p className="text-sm text-gray-500 capitalize mt-2">
                {productObj.category}
              </p>

              <div className="flex flex-col min-[480px]:flex-row items-start min-[480px]:items-center justify-between gap-3 mt-4">

                <p className="text-lg sm:text-xl font-bold text-green-600">
                  $ {productObj.price}
                </p>

                <button
                  onClick={() => addToCart(productObj)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md transition w-full min-[480px]:w-auto"
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Shop;
