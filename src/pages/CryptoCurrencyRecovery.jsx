import Navbar from '@components/navbar'

function CryptoLossReport() {
    return (
        <>
        <Navbar/>
        <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Cryptocurrency Loss Report
          </h2>
          <form className="space-y-4">
            {/* Input Fields */}
            {[
              { label: "Full Name", type: "text", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Phone Number", type: "tel", required: true },
              { label: "Amount Lost", type: "number", required: true },
              { label: "Equivalent USDT Value", type: "number", required: true },
              { label: "Transaction ID (TXID)", type: "text", required: true },
              { label: "Sending Wallet Address", type: "text", required: true },
              { label: "Receiving Wallet Address", type: "text", required: true },
              { label: "Platform Used", type: "text" },
              { label: "Blockchain Transaction Hash", type: "text" },
              { label: "Payment Method Used", type: "text" },
              { label: "Exchange Account Information", type: "text" },
              { label: "Wallet Backup/Private Key (If Compromised)", type: "text" },
            ].map(({ label, type, required }) => (
              <div key={label}>
                <label className="block text-gray-300 mb-1">{label}</label>
                <input
                  type={type}
                  required={required}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
  
            {/* Cryptocurrency Type Dropdown */}
            <div>
              <label className="block text-gray-300 mb-1">Cryptocurrency Type</label>
              <select
                required
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Bitcoin", "Ethereum", "USDT", "BNB", "Solana", "Other"].map((crypto) => (
                  <option key={crypto} value={crypto}>
                    {crypto}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Date & Time of Transaction */}
            <div>
              <label className="block text-gray-300 mb-1">Date & Time of Transaction</label>
              <input
                type="datetime-local"
                required
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            {/* Description */}
            <div>
              <label className="block text-gray-300 mb-1">How the Loss Happened</label>
              <textarea
                rows="4"
                required
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
  
            {/* File Upload */}
            <div>
              <label className="block text-gray-300 mb-1">Evidence of Fraud</label>
              <input
                type="file"
                multiple
                className="w-full text-gray-300 p-2 bg-gray-700 rounded cursor-pointer"
              />
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
        </>
    );
  }
  
  export default CryptoLossReport;
  