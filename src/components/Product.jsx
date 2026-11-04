// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Product = () => {
//   const [productData, setProductData] = useState({});

//   const { id } = useParams();

//   const fetchSingleProduct = async () => {
//     try {
//       const rawData = await fetch(`https://fakestoreapi.noksha.dev/api/products/${id}`, {
//         method: "GET",
//       });
//       const data = await rawData.json();
//       console.log(data);
//       setProductData(data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     fetchSingleProduct();
//   }, [id]);

//   return (
//     <div>
//       {/* <p className="ml-8 text-2xl  text-mauve-500 ">Home / Shop / T-Shirt</p> */}
//       <div className="flex ml-8 gap-10 justify-center h-120 mt-10">
//         <div>
//           <img
//             className=" w-fit h-80 border-0 rounded-xl"
//             src={productData.image}
//             alt=""
//           />
//         </div>

//         <div>
//           <h1 className="font-extrabold text-4xl">
//             {productData.title}
//             <br></br>
//             {productData.price}
//           </h1>

//           <p className="mt-4 w-3xl text-mauve-500">{productData.description}</p>
//           <h2 className="font-bold mt-4">Quantity:</h2>
//           <div className="font-bold flex gap-1 items-center  mt-3">
//             <button className="border-2  py-3 px-5 text-2xl  border-gray-400">
//               -
//             </button>
//             <div className="border-2  py-3 px-5 text-2xl  border-gray-400">
//               {1}
//             </div>
//             <button className="border-2 py-3 px-5 text-2xl  border-gray-400 ">
//               +
//             </button>
//           </div>
//           <button className=" bg-blue-400 text-white px-6 py-3 rounded-md mt-4">
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* productID = {id}
//        productData.image , price  */}
//     </div>
//   );
// };

// export default Product;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [productData, setProductData] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  const { id } = useParams();

  const fetchSingleProduct = async () => {
    try {
      const rawData = await fetch(
        `${import.meta.env.STORE_API}/api/products/${id}`,
        {
          method: "GET",
        },
      );

      const data = await rawData.json();

      console.log("Single Product:", data);

      setProductData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCartProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.WEB_URL}/cart/getProduct`);

      const data = await res.json();

      console.log("Cart Products:", data);

      setCartProducts(data);
    } catch (error) {
      console.log("Cart get error:", error);
    }
  };

  
  // const increase = async (id) => {
  //   const filterProduct = cartProduct.find((items) => {
  //     return items._id == id;
  //   });
  //   const increasedQuantity = {
  //     ...filterProduct,
  //     quantity: filterProduct.quantity + 1,
  //   };
  //   console.log(increasedQuantity, "increased successfully");

  //   const res = await fetch("http://localhost:5000/cart/increase", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(increasedQuantity),
  //   });
  //   const data = await res.json();

  //   console.log(data, "Backend response");
  // };

  useEffect(() => {
    fetchSingleProduct();
    getCartProducts();
  }, [id]);

  const addToCart = async (productData) => {
    try {
      console.log("Product:", productData);
      console.log("Cart:", cartProducts);

      const existingProduct = cartProducts.find(
        (item) => item.productIdNumber == productData._id,
      );

      if (existingProduct) {
        console.log("Existing Product:", existingProduct);

        const increasedQuantity = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };

        const res = await fetch(`${import.meta.env.WEB_URL}/cart/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(increasedQuantity),
        });

        const data = await res.json();

        console.log("Quantity Increased:", data);

        getCartProducts();
      } else {
        console.log("New Product");

        const productwithQntity = {
          ...productData,
          quantity: 1,
        };

        const res = await fetch(`${import.meta.env.WEB_URL}/cart/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productwithQntity),
        });

        const data = await res.json();

        console.log("New Product Added:", data);

        getCartProducts();
      }
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };



  return (
    <div>
      <div className="flex ml-8 gap-10 justify-center h-120 mt-10">
        <div>
          <img
            className="w-fit h-80 border-0 rounded-xl"
            src={productData.image}
            alt={productData.title}
          />
        </div>

        <div>
          <h1 className="font-extrabold text-4xl">
            {productData.title}
            <br />$ {productData.price}
          </h1>

          <p className="mt-4 w-3xl text-mauve-500">{productData.description}</p>

          <h2 className="font-bold mt-4">Quantity:</h2>

          <div className="font-bold flex gap-1 items-center mt-3">
            <button className="border-2 py-3 px-5 text-2xl border-gray-400">
              -
            </button>

            <div className="border-2 py-3 px-5 text-2xl border-gray-400">1</div>

            <button onClick={() => increase(Product._id)} className="border-2 py-3 px-5 text-2xl border-gray-400">
              +
            </button>
          </div>

          <button
            onClick={() => addToCart(productData)}
            className="bg-blue-400 text-white px-6 py-3 rounded-md mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
