import { CiDeliveryTruck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

function About() {
  return (
    <div>
      <h1 className="text-5xl font-extrabold flex justify-center mt-10">
        {" "}
        About us{" "}
      </h1>
      <p className="flex justify-center text-2xl text-gray-500 m-4">
        SmartStore is a simple e-commerce website for <br></br> everyone. We
        provide quality products at affordable <br></br> prices. Our goal is to
        make online shopping easy <br></br> and conveinenet.
      </p>
      <div className="flex gap-60 mt-16">
     <div>
        <div className="text-5xl text-blue-500 pl-80">
           <CiDeliveryTruck />
        </div>{" "}
        <p className="text-2xl font-bold pl-80">Fast Delivery</p>{" "}
      </div>
      <div 
    //   className="flex justify-center items-center"
      >
        <div className="text-5xl text-blue-500 ">
           <RiSecurePaymentLine />
        </div>{" "}
        <p className="text-2xl font-bold ">Secure Payment</p>{" "}
      </div>
       <div className=" pr-80">
        <div className="text-5xl text-blue-500 ">
           <BiSupport />
        </div>{" "}
        <p className="text-2xl font-bold ">24/7 Support</p>{" "}
      </div>
      </div>
      
        
      
    </div>
  );
}

export default About;
