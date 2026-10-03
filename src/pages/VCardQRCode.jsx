import SEO from "../components/SEO";
import QRGeneratorApp from "../components/QRGeneratorApp";

function VCardQRCode() {
  return (
    <>
      <SEO
        title="Free vCard QR Code Generator"
        description="Create a digital business card QR code containing your name, phone, email, company and website."
        canonical="/vcard-qr-code"
      />

      <QRGeneratorApp defaultType="vcard" />
    </>
  );
}

export default VCardQRCode;
