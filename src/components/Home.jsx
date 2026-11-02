// import { useEffect, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const Home = () => {
  // const [storeData, setStoreData] = useState("");
  // // const nevigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch("http://localhost:5000/cart/getProduct");
      const data = await res.json();

      // const data = localStorage.getItem("products");
      if (data) {
        setCartProducts(data);
      }
    };
    getProduct();
  }, []);
  const fetchStore = async () => {
    try {
      const rawData = await fetch(
        "https://fakestoreapi.noksha.dev/api/products",
        {
          method: "GET",
        },
      );
      const data = await rawData.json();

      setProducts(data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data);
  //     });
  // }, []);

  return (
    <>
      <section className="hero w-full h-[80vh] ">
        <div className="bg-gray-100 w-full h-[90%]  flex flex-col justify-center items-start pl-40">
          <h1 className="text-7xl font-bold">Simple Products</h1>
          <h1 className="text-7xl font-bold">For a Better Life</h1>
          <p className="mt-6 text-xl text-gray-600">
            Shop the best prducts at the better price
          </p>
          <button className="mt-6 bg-blue-400 text-white px-6 py-3 rounded-md">
            Shop Now
          </button>
        </div>
      </section>
      <section className="featured-products">
        <h2 className="font-bold  pl-20 mb-5 ">Featured Productes</h2>
        <div className="grid grid-cols-1 m-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {/* <h2 className="font-bold  pl-20 mb-5 ">Featured Productes</h2> */}
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                className=" w-52 h-56 border-0 rounded-t-xl"
                src={product.image}
                alt={product.title}
              />
              <h3 className="font-bold mt-2">{product.title}</h3>
              <p className="font-bold mt-2">{product.category}</p>
              <p className="font-bold mt-2">${product.price}</p>
              <button
                onClick={() => {
                  console.log("Added:", product);
                }}
                className="mt-2 bg-blue-400 text-white px-6 py-3 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          ))}
          {/* <div className="flex justify-around gap-20 mx-20">
            <div>
              <div>
                <img
                  className=" w-52 h-56 border-0 rounded-t-xl"
                  src="https://image.hm.com/assets/hm/fb/1e/fb1ec5f3e79a3009b91bc9f12dc45156f01ded57.jpg?imwidth=768"
                  alt=""
                />
              </div>
              <div className="border-0 rounded-2xl shadow-2xl shadow-gray-200 pl-3">
                <p className="font-bold mt-2">T-Shirt</p>
                <p className="font-bold mt-2">₹499</p>
                <button className="mt-2 bg-blue-400 text-white px-6 py-3 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              <div>
                <img
                  className=" w-52 h-56 border-0 rounded-t-xl "
                  src="https://rukminim2.flixcart.com/image/1536/1536/xif0q/shoe/o/6/c/-original-imahg2fsabzmydjg.jpeg?q=90"
                  alt=""
                />
              </div>
              <div className="border-0 rounded-2xl shadow-2xl shadow-gray-200 pl-3">
                <p className="font-bold mt-2">Shoes</p>
                <p className="font-bold mt-2">₹1,299</p>
                <button className="mt-2 bg-blue-400 text-white px-6 py-3 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              <div>
                <img
                  className="w-52 h-56 border-0 rounded-t-xl "
                  src="https://media.mango.com/is/image/punto/37031355-99-900?wid=2048"
                  alt=""
                />
              </div>
              <div className="border-0 rounded-2xl shadow-2xl shadow-gray-200 pl-3">
                <p className="font-bold mt-2">Backpack</p>
                <p className="font-bold mt-2">₹799</p>
                <button className="mt-2 bg-blue-400 text-white px-6 py-3 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              <div>
                <img
                  className="w-52 h-56 border-0 rounded-t-xl "
                  src="https://styleunion.in/cdn/shop/files/WD00375OLIVE_1.webp?v=1772691923&width=1100"
                  alt=""
                />
              </div>
              <div className="border-0 rounded-2xl shadow-2xl shadow-gray-200 pl-3">
                <p className="font-bold mt-2">Dress</p>
                <p className="font-bold mt-2">₹799</p>
                <button className="mt-2 bg-blue-400 text-white px-6 py-3 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              <div>
                <img
                  className="w-52 h-56 border-0 rounded-t-xl "
                  src="https://m.media-amazon.com/images/I/31MF8HhycqL.jpg"
                  alt=""
                />
              </div>
              <div className="border-0 rounded-2xl shadow-2xl shadow-gray-200 pl-3">
                <p className="font-bold mt-2">Purse</p>
                <p className="font-bold mt-2">₹799</p>
                <button className="mt-2 bg-blue-400 text-white px-6 py-3 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Home;
