// - Request type: `POST`
// - Headers: `Content-Type: application/json` (unless file upload is involved — then use `FormData`)import React, { useState } from "react";
import Navbar from "@components/navbar";
import { API_BASE_URL, authenticatedFetch } from '../utils/Setup.js';

function CryptoLossReport() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    amountLost: "",
    usdtValue: "",
    txid: "",
    senderWallet: "",
    receiverWallet: "",
    platformUsed: "",
    blockchainHash: "",
    paymentMethod: "",
    exchangeInfo: "",
    walletBackup: "",
    cryptoType: "Bitcoin",
    transactionDateTime: "",
    lossDescription: "",
    evidenceFiles: [],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  // Handle input changes (text & file)
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const submission = new FormData();

      // Append all fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "evidenceFiles") {
          Array.from(value).forEach((file) => {
            submission.append("evidenceFiles", file);
          });
        } else {
          submission.append(key, value);
        }
      });

      const res = await authenticatedFetch(`${API_BASE_URL}/api/crypto-loss-report`, {
        method: "POST",
        body: submission,
        // Note: Content-Type is automatically omitted for FormData by authenticatedFetch
      });

      if (res && res.ok) {
        setSubmitStatus({
          type: "success",
          message: "Report submitted successfully!"
        });
        // Optionally reset the form
        // setFormData({ ...initialFormState });
      } else if (res) {
        const errorData = await res.json().catch(() => ({}));
        setSubmitStatus({
          type: "error",
          message: errorData.message || "Failed to submit report."
        });
      } else {
        // res is null (handled by authenticatedFetch - likely a 401 auth error)
        setSubmitStatus({
          type: "error",
          message: "Authentication error. Please log in again."
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred while submitting."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form field definitions for cleaner rendering
  const formFields = [
    { label: "Full Name", name: "fullName", type: "text", required: true },
    { label: "Email Address", name: "email", type: "email", required: true },
    { label: "Phone Number", name: "phone", type: "tel", required: true },
    { label: "Amount Lost", name: "amountLost", type: "number", required: true },
    { label: "Equivalent USDT Value", name: "usdtValue", type: "number", required: true },
    { label: "Transaction ID (TXID)", name: "txid", type: "text", required: true },
    { label: "Sending Wallet Address", name: "senderWallet", type: "text", required: true },
    { label: "Receiving Wallet Address", name: "receiverWallet", type: "text", required: true },
    { label: "Platform Used", name: "platformUsed", type: "text" },
    { label: "Blockchain Transaction Hash", name: "blockchainHash", type: "text" },
    { label: "Payment Method Used", name: "paymentMethod", type: "text" },
    { label: "Exchange Account Information", name: "exchangeInfo", type: "text" },
    { label: "Wallet Backup/Private Key (If Compromised)", name: "walletBackup", type: "text" },
  ];

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-black/10 backdrop-blur-sm p-6">
        <div className="bg-white/5 text-white border border-white/10 p-8 rounded-2xl shadow-xl w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Cryptocurrency Loss Report
          </h2>
          
          {/* Status Messages */}
          {submitStatus.message && (
            <div className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === "success" 
                ? "bg-green-800/30 border border-green-500/30 text-green-200" 
                : "bg-red-800/30 border border-red-500/30 text-red-200"
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Text Inputs */}
            {formFields.map(({ label, name, type, required }) => (
              <div key={name}>
                <label className="block text-white mb-1">
                  {label} {required && <span className="text-red-400">*</span>}
                </label>
                <input
                  type={type}
                  name={name}
                  required={required}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {/* Cryptocurrency Type Dropdown */}
            <div>
              <label className="block text-white mb-1">Cryptocurrency Type <span className="text-red-400">*</span></label>
              <select
                name="cryptoType"
                required
                value={formData.cryptoType}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Bitcoin", "Ethereum", "USDT", "BNB", "Solana", "Other"].map((crypto) => (
                  <option key={crypto} value={crypto}>
                    {crypto}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-white mb-1">Date & Time of Transaction <span className="text-red-400">*</span></label>
              <input
                type="datetime-local"
                name="transactionDateTime"
                value={formData.transactionDateTime}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-white mb-1">How the Loss Happened <span className="text-red-400">*</span></label>
              <textarea
                name="lossDescription"
                rows="4"
                value={formData.lossDescription}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-white mb-1">Evidence of Fraud</label>
              <input
                type="file"
                name="evidenceFiles"
                multiple
                onChange={handleChange}
                className="w-full text-white p-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting 
                  ? "bg-blue-400" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 flex justify-center items-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit Report"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CryptoLossReport;