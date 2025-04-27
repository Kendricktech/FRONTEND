import React, { useState } from "react";
import authenticatedFetch from '../utils/auth.js';
import API_BASE_URL from '../utils/../utils/Setup.js';
import Navbar from "@components/navbar";

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
    
    // Corrected authenticatedFetch call
    const response = await authenticatedFetch(
      `${API_BASE_URL}/cases/crypto-loss`,
      {
        method: "POST",
        body: submission
        // Don't set Content-Type header - FormData sets it automatically
      }
    );
    
    if (!response) {
      // Handle 401 unauthorized case
      return;
    }
    
    if (response.ok) {
      alert("Report submitted successfully!");
      // Optional: Reset form after successful submission
      
    } else {
      const errorData = await response.json();
      alert(`Failed to submit report: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("An error occurred while submitting.");
  }
};
}
export default CryptoLossReport;
