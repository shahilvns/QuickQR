import SEO from "../components/SEO";
import QRGeneratorApp from "../components/QRGeneratorApp";
import AdSlot from "../components/AdSlot";
import FAQSchema from "../components/FAQSchema";
import FAQ from "../components/FAQ";
function QRGenerator() {
  const faqs = [
    {
      question: "Is the QR code generator free?",
      answer:
        "Yes. You can create QR codes online without creating an account.",
    },
    {
      question: "What types of QR codes can I create?",
      answer:
        "You can create QR codes for URLs, text, WiFi, WhatsApp, email, phone numbers and contacts.",
    },
    {
      question: "Can I download my QR code?",
      answer: "Yes. Generated QR codes can be downloaded as an image.",
    },
    {
      question: "Does QuickQR store my QR data?",
      answer:
        "QuickQR is designed to process QR generation directly in your browser whenever possible.",
    },
  ];
  return (
    <>
      <SEO
        title="Free QR Code Generator - Create Custom QR Codes"
        description="Create free QR codes for URLs, text, Wi-Fi, WhatsApp, email and contacts. Customize colors, add your logo and download your QR code."
        canonical="/qr-code-generator"
      />

      <QRGeneratorApp />

      <FAQSchema items={faqs} />

      <section className="px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold dark:text-white">
          Frequently Asked Questions
        </h2>

        <FAQ items={faqs} />
      </section>
      <AdSlot className="mx-auto my-8 max-w-4xl" />
    </>
  );
}

export default QRGenerator;
