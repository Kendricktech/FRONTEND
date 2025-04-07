import Navbar from '@components/navbar'
function MoneyRecoveryForm() {
    return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-6">Report Fraud</h2>
          
          <form className="space-y-4">
            {/* Input Fields */}
            {[
              { label: "First Name", type: "text", required: true },
              { label: "Last Name", type: "text", required: true },
              { label: "Phone Number", type: "tel", required: true },
              { label: "Email Address", type: "email", required: true },
              { label: "Identification (DNI/NIE/Passport)", type: "text", required: true },
              { label: "Amount Lost", type: "number", required: true },
              { label: "Reference Number / Transaction ID", type: "text" },
              { label: "Bank / Payment Platform", type: "text", required: true },
              { label: "Bank Account / IBAN", type: "text", required: true },
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
  
            {/* Date & Time of Transaction */}
            <div>
              <label className="block text-gray-300 mb-1">Date & Time of Transaction</label>
              <input
                type="datetime-local"
                required
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            {/* Description of Fraud */}
            <div>
              <label className="block text-gray-300 mb-1">Description of Fraud</label>
              <textarea
                rows="4"
                required
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
  
            {/* File Upload */}
            <div>
              <label className="block text-gray-300 mb-1">Proof of Fraud (Screenshots/Documents)</label>
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
  
  export default MoneyRecoveryForm;
  