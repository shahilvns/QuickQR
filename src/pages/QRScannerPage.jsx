import SEO from "../components/SEO";
import QRScanner from "../components/QRScanner";

function QRScannerPage() {
  return (
    <>
      <SEO
        title="Free QR Scanner - Scan QR Codes Online"
        description="Scan QR codes online using your camera or upload a QR code image. Fast, free and privacy-friendly QR scanner."
        canonical="/qr-scanner"
      />

      <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black sm:text-5xl text-slate-900 transition-colors duration-300 dark:text-white">
              Free QR Scanner
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Scan QR codes instantly using your camera or upload a QR code
              image.
            </p>
          </div>

          <QRScanner darkMode={false} />
        </div>
      </div>
    </>
  );
}

export default QRScannerPage;
