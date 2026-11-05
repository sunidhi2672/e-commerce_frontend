
function Contact() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold flex justify-center mt-10">
        Contact Us
      </h1>

      <p className="text-center text-base sm:text-lg md:text-xl text-gray-500 m-4">
        We'd love to hear from you. Feel free to reach out!
      </p>

      <form className="flex flex-col w-full max-w-md mx-auto">

        <label className="mt-2">Name</label>
        <input
          className="border-2 border-mauve-400 px-2 h-10 w-full rounded"
          type="text"
          placeholder="Enter Your Name"
        />

        <label className="mt-3">Email</label>
        <input
          className="border-2 border-mauve-400 px-2 h-10 w-full rounded"
          type="email"
          placeholder="Enter Your Email"
        />

        <label className="mt-3">Message</label>
        <textarea
          className="border-2 border-mauve-400 h-24 px-2 py-1 w-full rounded"
          placeholder="Enter Your Message"
        ></textarea>

        <button
          type="submit"
          className="border-0 rounded-lg bg-blue-400 w-full h-11 mt-6 mb-8 text-white text-lg hover:bg-blue-500"
        >
          Send Message
        </button>

      </form>

    </div>
  );
}

export default Contact;
