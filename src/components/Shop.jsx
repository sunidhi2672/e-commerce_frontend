import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Shop() {
  // const [test, setTest] = useState("");
  // const [test2, setTest2] = useState("");

  // store Data that coming from API
  const [storeData, setStoreData] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`${import.meta.env.WEB_URL}/cart/getProduct`);
      const data = await res.json();

      // const data = localStorage.getItem("products");
      if (data) {
        setCartProducts(data);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    const fetchStore = async () => {
      //error handling
      try {
        const rawData = await fetch(
          "https://fakestoreapi.noksha.dev/api/products",
          {
            method: "GET", // Specify the HTTP method
            // headers: {
            //   "Content-Type": "application/json", // Inform server about the data format
            // },
            // body: JSON.stringify(payload), // Convert JS object to JSON string
          },
        );
        const data = await rawData.json(); // wait krna hai jab tak data ni a jyee  pir use convert kr dena hai
        setStoreData(data.data); // store a data in state
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchStore();
  }, []);

  // try {
  //   // call api jo us ch error ho to us ko handle krda hai
  //   // agr es my error a jyee to niche catch wale section my chal jata hai
  // } catch (error) {
  //   console.log(error);
  // }
  // console.log(cartProducts,"ha ji")
  const handleNavigateProduct = (_id) => {
    navigate(`/product/${_id}`);
    // navigate("/product/"+ id)
  };

  const addToCart = async (productData) => {
    console.log({ productData, cartProducts });
    const existingProduct = cartProducts.find(
      (item) => item.productIdNumber  == productData._id,
    );

    // [{},{},{}]
    // [{},{},{},{}]
    if (existingProduct) {
      console.log(existingProduct, "existing");

      const increasedQuantity = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      };

      // const filterExistingProduct = cartProducts.filter(
      //   (items) => items._id !== productData._id,
      // );

      // const newCartItem = [...filterExistingProduct, increasedQuantity];

      // setCartProducts(newCartItem);

      const res = await fetch(`${import.meta.env.WEB_URL}/cart/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(increasedQuantity),
      });
    } else {
      console.log("new");
      const productwithQntity = { ...productData, quantity: 1 };
      console.log(productwithQntity);

      const res = await fetch(`${import.meta.env.WEB_URL}/cart/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productwithQntity),
      });
      //       if (!response.ok) {
      // throw new Error("Product save nahi hua");
      //       }

      const data = await res.json();

      console.log("Backend response:", data);
      // const oldCart = JSON.parse(localStorage.getItem("products") || "[]");

      // const updatedCart = [...oldCart, product];
      // localStorage.setItem("products", JSON.stringify(updatedCart));
      // alert("Product cart me add ho gaya!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 w-full sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 max-w-full px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-sm sm:text-base md:text-lg lg:text-xl">
      {/* Inputs */}
      {/* <div className="flex gap-3 px-6 mb-8">
        <input
          value={test}
          placeholder="Typing..."
          className="p-3 border border-gray-300 rounded-md bg-white outline-none"
          type="text"
          onChange={(e) => setTest(e.target.value)}
        />

        <input
          value={test2}
          placeholder="Test2..."
          className="p-3 border border-gray-300 rounded-md bg-white outline-none"
          type="text"
          onChange={(e) => setTest2(e.target.value)}
        />
      </div>

      <p className="px-6 mb-6 text-lg font-semibold">{test}</p> */}

      {/* Heading */}
      <h2 className="text-3xl font-bold px-6 mb-8">All Products</h2>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {storeData.map((productObj) => (
          <div
            key={productObj._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="w-full h-64 flex items-center justify-center bg-white p-5">
              <img
                className="w-full h-full object-contain"
                src={productObj.image}
                alt={productObj.title}
                onClick={() => handleNavigateProduct(productObj._id)}
              />
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2 min-h-14">
                {productObj.title}
              </h3>

              <p className="text-sm text-gray-500 capitalize mt-2">
                {productObj.category}
              </p>

              <div className="flex items-center justify-between mt-4">
                <p className="text-xl font-bold text-green-600">
                  $ {productObj.price}
                </p>

                <button
                  onClick={() => {
                    addToCart(productObj);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
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

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Shop() {

// const addToCart = async (productData) => {
//   try {
//     // Check product already cart me hai ya nahi
//     const existingProduct = cartProducts.find(
//       (item) => item._id === productData._id
//     );

//     let newCartItem;
//     let productToSave;

//     if (existingProduct) {
//       // Agar product already hai to quantity +1
//       const increasedQuantity = {
//         ...existingProduct,
//         quantity: existingProduct.quantity + 1,
//       };

//       newCartItem = cartProducts.map((item) =>
//         item._id === productData._id ? increasedQuantity : item
//       );

//       productToSave = increasedQuantity;
//     } else {
//       // Naya product hai to quantity 1
//       productToSave = {
//         ...productData,
//         quantity: 1,
//       };

//       newCartItem = [...cartProducts, productToSave];
//     }

//     // 1. React state me save
//     setCartProducts(newCartItem);

//     // 2. LocalStorage me save
//     localStorage.setItem("products", JSON.stringify(newCartItem));

//     // 3. Backend me save
//     const response = await fetch("http://localhost:5500/cart/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(productToSave),
//     });

//     if (!response.ok) {
//       throw new Error("Product backend me save nahi hua");
//     }

//     const data = await response.json();

//     console.log("Backend response:", data);

//     alert("Product cart me add ho gaya!");
//   } catch (error) {
//     console.log("Add to cart error:", error);
//     alert("Product add karne me error aaya");
//   }
// };

// //  export default Shop;
// }

// export default Shop;
