import SEO from "../components/SEO";
import QRGeneratorApp from "../components/QRGeneratorApp";

function URLQRCode() {
  return (
    <>
      <SEO
        title="Free URL QR Code Generator"
        description="Create a free QR code for any website URL. Customize your QR code, add a logo and download it instantly."
        canonical="/url-qr-code"
      />

      <QRGeneratorApp defaultType="url" />
    </>
  );
}

export default URLQRCode;
