import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QRGenerator from "./pages/QRGenerator";
import QRScannerPage from "./pages/QRScannerPage";
import WiFiQRCode from "./pages/WiFiQRCode";
import WhatsAppQRCode from "./pages/WhatsAppQRCode";
import VCardQRCode from "./pages/VCardQRCode";
import URLQRCode from "./pages/URLQRCode";
import FileToQR from "./pages/FileToQR";
import FileViewer from "./pages/FileViewer";

import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/qr-code-generator" element={<QRGenerator />} />

        <Route path="/qr-scanner" element={<QRScannerPage />} />

        <Route path="/file-to-qr" element={<FileToQR />} />

        <Route path="/f/:fileId" element={<FileViewer />} />

        <Route path="/wifi-qr-code" element={<WiFiQRCode />} />

        <Route path="/whatsapp-qr-code" element={<WhatsAppQRCode />} />

        <Route path="/vcard-qr-code" element={<VCardQRCode />} />

        <Route path="/url-qr-code" element={<URLQRCode />} />

        <Route path="/about" element={<About />} />

        <Route path="/privacy-policy" element={<Privacy />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
