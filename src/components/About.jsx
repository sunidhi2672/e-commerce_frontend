
import { CiDeliveryTruck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

function About() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold flex justify-center mt-10">
        About us
      </h1>

      <p className="text-center text-base sm:text-lg md:text-2xl text-gray-500 m-4">
        SmartStore is a simple e-commerce website for everyone.
        We provide quality products at affordable prices.
        Our goal is to make online shopping easy and convenient.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-8 md:gap-16 lg:gap-28 xl:gap-40 mt-16 mb-10">

        <div className="flex flex-col items-center">
          <div className="text-5xl text-blue-500">
            <CiDeliveryTruck />
          </div>
          <p className="text-xl sm:text-2xl font-bold">
            Fast Delivery
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-5xl text-blue-500">
            <RiSecurePaymentLine />
          </div>
          <p className="text-xl sm:text-2xl font-bold">
            Secure Payment
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-5xl text-blue-500">
            <BiSupport />
          </div>
          <p className="text-xl sm:text-2xl font-bold">
            24/7 Support
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;
