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

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submission = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "evidenceFiles") {
          Array.from(value).forEach((file) => {
            submission.append("evidenceFiles", file);
          });
        } else {
          submission.append(key, value);
        }
      });
      
      const response = await authenticatedFetch(
        `${API_BASE_URL}/cases/crypto-loss`,
        {
          method: "POST",
          body: submission
        }
      );
      
      if (!response) return;
      
      if (response.ok) {
        alert("Report submitted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit report: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting.");
    }
  };

  // Here's the missing JSX for the form UI
  return (
    <div className="crypto-loss-report">
      <Navbar />
      <div className="container">
        <h1>Crypto Loss Report</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Cryptocurrency Type</label>
            <select
              name="cryptoType"
              value={formData.cryptoType}
              onChange={handleChange}
            >
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="USDT">USDT</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount Lost</label>
            <input
              type="number"
              name="amountLost"
              value={formData.amountLost}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Transaction ID (TXID)</label>
            <input
              type="text"
              name="txid"
              value={formData.txid}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Transaction Date/Time</label>
            <input
              type="datetime-local"
              name="transactionDateTime"
              value={formData.transactionDateTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description of Loss</label>
            <textarea
              name="lossDescription"
              value={formData.lossDescription}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Evidence Files</label>
            <input
              type="file"
              name="evidenceFiles"
              onChange={handleChange}
              multiple
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default CryptoLossReport;