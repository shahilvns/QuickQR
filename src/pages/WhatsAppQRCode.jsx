import SEO from "../components/SEO";
import QRGeneratorApp from "../components/QRGeneratorApp";

function WhatsAppQRCode() {
  return (
    <>
      <SEO
        title="Free WhatsApp QR Code Generator"
        description="Create a WhatsApp QR code with your phone number and optional message. Share your WhatsApp instantly."
        canonical="/whatsapp-qr-code"
      />

      <QRGeneratorApp defaultType="whatsapp" />
    </>
  );
}

export default WhatsAppQRCode;
