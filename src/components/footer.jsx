<footer className="bg-black/50 backdrop-blur-md text-white p-6 mt-10">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    {/* Brand & Copyright */}
    <div className="text-center md:text-left mb-4 md:mb-0">
      <h2 className="text-lg font-bold">Recovery Guard</h2>
      <p className="text-sm text-gray-300">© {new Date().getFullYear()}, All rights reserved.</p>
    </div>

    {/* Social Media Links */}
    <div className="flex space-x-4 mb-4 md:mb-0">
      <a href="#" className="text-gray-300 hover:text-blue-500">
        <Facebook size={24} />
      </a>
      <a href="#" className="text-gray-300 hover:text-blue-400">
        <Twitter size={24} />
      </a>
      <a href="#" className="text-gray-300 hover:text-blue-600">
        <Linkedin size={24} />
      </a>
      <a href="#" className="text-gray-300 hover:text-pink-500">
        <Instagram size={24} />
      </a>
    </div>

    {/* Contact Us Button */}
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      onClick={() => setIsContactOpen(!isContactOpen)}
    >
      Contact Us
    </button>
  </div>

  {/* Contact Form Modal */}
  {isContactOpen && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-gray-900/90 p-6 rounded-lg shadow-lg w-full max-w-md text-white">
        <h3 className="text-lg font-semibold mb-4 text-center">Contact Us</h3>
        <form>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 text-white mb-3"
            required
          />

          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-800 text-white mb-3"
            required
          />

          <label className="block text-sm">Message</label>
          <textarea
            rows="4"
            className="w-full p-2 rounded bg-gray-800 text-white mb-3"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        <button
          className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={() => setIsContactOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  )}
</footer>
