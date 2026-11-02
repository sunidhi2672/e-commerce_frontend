function Contact() {
  return (
    <div>
      <h1 className="text-5xl font-extrabold flex justify-center mt-10">
        Contact Us
      </h1>
      <p className="flex justify-center text-xl text-gray-500 m-4">
        we'd love to hearmfrom you. Feel free to reach out!
      </p>
      <form className="flex flex-col ml-136 w-md">
        <label className="">Name</label>
        <input
          className=" border-2 border-mauve-400 px-2 h-10"
          type="text"
          placeholder="Enter Your Name"
        />
        <label className="">Email</label>
        <input
          className=" border-2 border-mauve-400 px-2 h-10"
          type="email"
          placeholder="Enter Your Email"
        />
        <label className="">Message</label>
        {/* <input className=" border-2 border-mauve-400" type="text" placeholder="Enter Your Name" /> */}
        <textarea
          className="border-2 border-mauve-400 h-24 px-2 py-1"
          placeholder="Enter Your Message"
        ></textarea>
      </form>
      <button className="border-0 rounded-l bg-blue-400 w-md h-10 ml-136 mt-8 mb-8">
        Send Message
      </button>
    </div>
  );
}

export default Contact;
