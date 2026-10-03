import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Upload,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  RefreshCw,
  QrCode,
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

const SCANNER_ID = "quickqr-scanner";

function QRScanner({ darkMode }) {
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);

  const [result, setResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("quickqr_scan_history")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const addHistory = (text) => {
    const item = {
      id: Date.now(),
      value: text,
      createdAt: new Date().toISOString(),
    };

    const updated = [item, ...history].slice(0, 20);

    setHistory(updated);

    localStorage.setItem("quickqr_scan_history", JSON.stringify(updated));
  };

  const handleSuccess = (decodedText) => {
    setResult(decodedText);
    addHistory(decodedText);

    stopScanner();
  };

  const startScanner = async () => {
    try {
      if (isScanning) return;

      const scanner = new Html5Qrcode(SCANNER_ID);

      scannerRef.current = scanner;

      await scanner.start(
        {
          facingMode: cameraFacing,
        },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
          aspectRatio: 1,
        },
        (decodedText) => {
          handleSuccess(decodedText);
        },
        () => {},
      );

      setIsScanning(true);
    } catch (error) {
      console.error(error);

      alert("Camera access failed. Please allow camera permission.");
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        const scanner = scannerRef.current;

        if (scanner.isScanning) {
          await scanner.stop();
        }

        await scanner.clear();

        scannerRef.current = null;
      }
    } catch (error) {
      console.error(error);
    }

    setIsScanning(false);
  };

  const switchCamera = async () => {
    await stopScanner();

    setCameraFacing((prev) =>
      prev === "environment" ? "user" : "environment",
    );
  };

  const handleImageScan = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      await stopScanner();

      const scanner = new Html5Qrcode("quickqr-image-scanner");

      const decodedText = await scanner.scanFile(file, true);

      setResult(decodedText);
      addHistory(decodedText);

      await scanner.clear();
    } catch (error) {
      console.error(error);

      alert("No QR code found in this image.");
    }

    event.target.value = "";
  };

  const copyResult = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const clearResult = () => {
    setResult("");
  };

  const clearHistory = () => {
    localStorage.removeItem("quickqr_scan_history");

    setHistory([]);
  };

  const deleteHistory = (id) => {
    const updated = history.filter((item) => item.id !== id);

    setHistory(updated);

    localStorage.setItem("quickqr_scan_history", JSON.stringify(updated));
  };

  const isUrl = (() => {
    if (!result) return false;

    try {
      const url = new URL(result);

      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  })();

  return (
    <div className="space-y-6">
      {/* Scanner Card */}

      <div
        className={`rounded-3xl border p-5 shadow-sm sm:p-7 ${
          darkMode
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <QrCode size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold">QR Scanner</h2>

                <p className="text-sm text-slate-400">
                  Scan a QR code using your camera
                </p>
              </div>
            </div>
          </div>

          {isScanning && (
            <span className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Scanning
            </span>
          )}
        </div>

        {/* Camera */}

        <div
          className={`relative overflow-hidden rounded-2xl border ${
            darkMode
              ? "border-slate-800 bg-black"
              : "border-slate-200 bg-slate-950"
          }`}
        >
          <div id={SCANNER_ID} className="min-h-[320px] w-full" />

          {!isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                <Camera size={40} />
              </div>

              <p className="font-semibold text-white">Camera Scanner</p>

              <p className="mt-2 text-center text-sm text-slate-400">
                Click Start Scanner to scan a QR code
              </p>
            </div>
          )}
        </div>

        {/* Camera buttons */}

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {!isScanning ? (
            <button
              onClick={startScanner}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              <Camera size={18} />
              Start Scanner
            </button>
          ) : (
            <button
              onClick={stopScanner}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-600"
            >
              <Camera size={18} />
              Stop Scanner
            </button>
          )}

          <button
            onClick={switchCamera}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold dark:border-slate-700"
          >
            <RefreshCw size={18} />
            Switch Camera
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold dark:border-slate-700"
          >
            <Upload size={18} />
            Upload QR
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageScan}
            className="hidden"
          />
        </div>

        {/* Hidden image scanner */}

        <div id="quickqr-image-scanner" className="hidden" />
      </div>

      {/* Result */}

      {result && (
        <div
          className={`rounded-3xl border p-5 sm:p-7 ${
            darkMode
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Scan Result</h3>

              <p className="mt-1 text-xs text-slate-400">
                QR code successfully decoded
              </p>
            </div>

            <button
              onClick={clearResult}
              className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div
            className={`rounded-xl border p-4 ${
              darkMode
                ? "border-slate-800 bg-slate-950"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <p className="break-all text-sm">{result}</p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={copyResult}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Result
                </>
              )}
            </button>

            {isUrl && (
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold dark:border-slate-700"
              >
                <ExternalLink size={18} />
                Open Link
              </a>
            )}
          </div>
        </div>
      )}

      {/* History */}

      {history.length > 0 && (
        <div
          className={`rounded-3xl border p-5 sm:p-7 ${
            darkMode
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Scan History</h3>

              <p className="text-xs text-slate-400">
                Saved locally in your browser
              </p>
            </div>

            <button
              onClick={clearHistory}
              className="text-xs font-semibold text-red-500"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  darkMode
                    ? "border-slate-800 bg-slate-950"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <QrCode size={20} className="shrink-0 text-indigo-500" />

                <button
                  onClick={() => setResult(item.value)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate text-sm font-medium">{item.value}</p>

                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </button>

                <button
                  onClick={() => deleteHistory(item.id)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QRScanner;
