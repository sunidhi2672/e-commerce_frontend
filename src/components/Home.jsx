
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchStore = async () => {
    try {
      const rawData = await fetch(
        `${import.meta.env.VITE_STORE_API}/api/products`,
        {
          method: "GET",
        }
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

  return (
    <div className="w-full max-w-full overflow-x-hidden">

      {/* Hero Section */}

      <section className="hero w-full min-h-[60vh] sm:min-h-[70vh] md:h-[80vh] p-3 sm:p-5">

        <div className="bg-gray-100 w-full h-full min-h-[55vh] flex flex-col justify-center items-start px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            Simple Products
          </h1>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            For a Better Life
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600">
            Shop the best products at the better price
          </p>

          <button className="mt-5 sm:mt-6 bg-blue-400 text-white px-5 sm:px-6 py-3 rounded-md">
            Shop Now
          </button>

        </div>
      </section>


      {/* Featured Products */}

      <section className="featured-products w-full px-3 sm:px-5 md:px-8">

        <h2 className="font-bold text-2xl sm:text-3xl mb-5 text-center sm:text-left sm:pl-4 md:pl-10 lg:pl-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 px-2 sm:px-4 md:px-6">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 p-3 flex flex-col items-center"
            >

              <img
                className="w-full h-48 sm:h-52 md:h-56 object-contain rounded-t-xl"
                src={product.image}
                alt={product.title}
              />

              <div className="w-full mt-2">

                <h3 className="font-bold text-base sm:text-lg line-clamp-2">
                  {product.title}
                </h3>

                <p className="font-bold mt-2 text-gray-600">
                  {product.category}
                </p>

                <p className="font-bold mt-2 text-lg">
                  ${product.price}
                </p>

                <button
                  onClick={() => {
                    console.log("Added:", product);
                  }}
                  className="mt-3 bg-blue-400 text-white px-5 py-3 rounded-md w-full hover:bg-blue-500"
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
};

export default Home;
