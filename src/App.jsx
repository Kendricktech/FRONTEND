import { Routes, Route } from "react-router-dom";
import Home from "@pages/home";
import SocialMediaRecoveryPage from "@pages/SocialMediaRecovery";
import MoneyRecoveryForm from "@pages/MoneyRecovery";
import CryptoLossReport from "@pages/CryptoCurrencyRecovery";
import ArticlesPage from "./pages/articles";
import RecoveryOptions from "./pages/RecoveryOptions"; // ✅ import new component
import ContactSection from "./pages/contact";
import AboutSection from "./pages/about";
import FAQSection from "./pages/faq";
import NotFound from "./pages/NotFound"; // Import the new NotFound component
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notifications from "./pages/Notifications";
import Cases from "./pages/Cases";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start-recovery" element={<RecoveryOptions />} /> {/* ✅ add route */}
      <Route path="/socials" element={<SocialMediaRecoveryPage />} />
      <Route path="/money-recovery" element={<MoneyRecoveryForm />} />
      <Route path="/crypto-recovery" element={<CryptoLossReport />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/contact" element={<ContactSection />} />
      <Route path="/about" element={<AboutSection />} />
      <Route path="/faq" element={<FAQSection />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="*" element={<NotFound />} /> {/* Use NotFound for 404 */}
    </Routes>
  );
}

export default App;
