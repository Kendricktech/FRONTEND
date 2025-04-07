import { Routes, Route } from "react-router-dom";
import Home from "@pages/home";
import SocialMediaRecoveryPage from "@pages/SocialMediaRecovery";
import MoneyRecoveryForm from "@pages/MoneyRecovery";
import CryptoLossReport from "@pages/CryptoCurrencyRecovery";
import ArticlesPage from "./pages/articles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/socials" element={<SocialMediaRecoveryPage />} />
      <Route path="/money-recovery" element={<MoneyRecoveryForm />} />
      <Route path="/crypto-recovery" element={<CryptoLossReport />} />
      <Route path="/articles" element={<ArticlesPage />} />
    </Routes>
  );
}

export default App;
