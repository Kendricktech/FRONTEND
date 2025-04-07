import Navbar from '@components/navbar'
function SocialMediaRecoveryPage() {
    return (
        <>
        <Navbar/>
        <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Social Media Account Recovery
          </h2>
          <form className="space-y-4">
            {/* Social Media Type Selection */}
            <div>
              <label className="block mb-1 text-gray-300">Type of Social Media</label>
              <select
                required
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[
                  "Facebook",
                  "Instagram",
                  "Twitter",
                  "LinkedIn",
                  "Snapchat",
                  "TikTok",
                  "Reddit",
                  "YouTube",
                  "Pinterest",
                  "WhatsApp",
                  "Telegram",
                  "Other",
                ].map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Input Fields */}
            {[
              { label: "Full Name", type: "text", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Phone Number", type: "tel" },
              { label: "Username/Handle", type: "text", required: true },
              { label: "Profile URL", type: "url" },
            ].map(({ label, type, required }) => (
              <div key={label}>
                <label className="block mb-1 text-gray-300">{label}</label>
                <input
                  type={type}
                  required={required}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
  
            {/* File Upload */}
            <div>
              <label className="block mb-1 text-gray-300">Profile Picture (Upload)</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-gray-300 p-2 bg-gray-700 rounded cursor-pointer"
              />
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
        </>
     
    );
  }
  
  export default SocialMediaRecoveryPage;
  