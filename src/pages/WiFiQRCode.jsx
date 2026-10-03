import SEO from "../components/SEO";
import QRGeneratorApp from "../components/QRGeneratorApp";

function WiFiQRCode() {
  return (
    <>
      <SEO
        title="Free WiFi QR Code Generator"
        description="Create a free WiFi QR code. Let guests connect to your WiFi network by simply scanning a QR code."
        canonical="/wifi-qr-code"
      />

      <QRGeneratorApp defaultType="wifi" />

      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-bold">What is a WiFi QR Code?</h2>

        <p className="mt-4 leading-7 text-slate-500">
          A WiFi QR code allows people to connect to a wireless network by
          scanning a QR code instead of manually entering the network name and
          password.
        </p>

        <h2 className="mt-10 text-3xl font-bold">
          How to Create a WiFi QR Code?
        </h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-500">
          <li>Enter your WiFi network name.</li>
          <li>Enter your WiFi password.</li>
          <li>Select your security type.</li>
          <li>Generate the QR code.</li>
          <li>Download and print your QR code.</li>
        </ol>
      </section>
    </>
  );
}

export default WiFiQRCode;
