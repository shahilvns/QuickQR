import { useCallback, useEffect, useState } from "react";
import {
  Upload,
  File,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Archive,
  X,
  QrCode,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Clock3,
  Lock,
  Sparkles,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import QRCode from "qrcode";
import { uploadFileQR, getFileQRImage } from "../api/fileQR";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const formatBytes = (bytes) => {
  if (!bytes) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 2)} ${
    units[index]
  }`;
};

const getFileIcon = (file) => {
  if (file.type.startsWith("image/")) {
    return ImageIcon;
  }

  if (file.type.startsWith("video/")) {
    return Video;
  }

  if (file.type.startsWith("audio/")) {
    return Music;
  }

  if (
    file.type.includes("pdf") ||
    file.type.includes("document") ||
    file.type.includes("word") ||
    file.type.includes("sheet") ||
    file.type.includes("excel")
  ) {
    return FileText;
  }

  if (
    file.type.includes("zip") ||
    file.type.includes("rar") ||
    file.type.includes("archive")
  ) {
    return Archive;
  }

  return File;
};

function FileToQR() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [createdFile, setCreatedFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [expiry, setExpiry] = useState("never");

  const [passwordEnabled, setPasswordEnabled] = useState(false);

  const [password, setPassword] = useState("");

  const [qrData, setQrData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("Maximum file size is 100 MB.");
      return;
    }

    setSelectedFile(file);
    setQrData(null);

    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setQrData(null);
    setCreatedFile(null);
    setUploadProgress(0);
    setPassword("");
    setPasswordEnabled(false);
  };

  const generateQR = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    if (passwordEnabled && !password.trim()) {
      alert("Please enter a password.");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const response = await uploadFileQR(
        selectedFile,
        expiry,
        passwordEnabled,
        (progressEvent) => {
          if (!progressEvent.total) return;

          const percentage = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          );

          setUploadProgress(percentage);
        },
      );

      setUploadProgress(100);

      const data = response.data;

      if (!data?.fileId || !data?.publicUrl) {
        throw new Error("Invalid response from server.");
      }

      const qrImage = await QRCode.toDataURL(data.publicUrl, {
        width: 900,
        margin: 3,
        errorCorrectionLevel: "H",
      });

      setCreatedFile(data);

      setQrData({
        image: qrImage,
        url: data.publicUrl,
      });
    } catch (error) {
      console.error("File QR error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload file.",
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrData?.image) return;

    const link = document.createElement("a");

    link.href = qrData.image;
    link.download = `${selectedFile?.name || "file"}-QR.png`;

    link.click();
  };

  const copyURL = async () => {
    if (!qrData?.url) return;

    await navigator.clipboard.writeText(qrData.url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:py-14">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20">
            <QrCode size={30} />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-400">
            <Sparkles size={15} />
            File to QR
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Turn Any File Into a QR Code
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">
            Upload a file and create a QR code that lets anyone access it after
            scanning.
          </p>
        </div>

        {/* MAIN GRID */}

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* LEFT */}

          <div className="space-y-6">
            {/* UPLOAD */}

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
              <div
                {...getRootProps()}
                className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition sm:p-14 ${
                  isDragActive
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                    : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-950"
                }`}
              >
                <input {...getInputProps()} />

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                  <Upload size={30} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  {isDragActive ? "Drop your file here" : "Upload your file"}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Drag & drop or click to browse
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  Images • Video • PDF • Documents • Audio • ZIP • Other files
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500 dark:bg-slate-800">
                  Maximum 100 MB
                </div>
              </div>
            </section>

            {/* FILE */}

            {selectedFile && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = getFileIcon(selectedFile);

                    return (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                        <Icon size={27} />
                      </div>
                    );
                  })()}

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-slate-900 dark:text-white">
                      {selectedFile.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {formatBytes(selectedFile.size)}
                    </p>
                  </div>

                  <button
                    onClick={removeFile}
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* IMAGE PREVIEW */}

                {preview && selectedFile.type.startsWith("image/") && (
                  <div className="mt-5 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
                    <img
                      src={preview}
                      alt="File preview"
                      className="max-h-[400px] w-full object-contain"
                    />
                  </div>
                )}

                {/* VIDEO PREVIEW */}

                {preview && selectedFile.type.startsWith("video/") && (
                  <div className="mt-5 overflow-hidden rounded-2xl bg-black">
                    <video
                      src={preview}
                      controls
                      className="max-h-[400px] w-full"
                    />
                  </div>
                )}
              </section>
            )}

            {/* SETTINGS */}

            {selectedFile && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <h2 className="mb-6 text-lg font-bold dark:text-white">
                  File QR Settings
                </h2>

                {/* EXPIRY */}

                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold dark:text-white">
                    <Clock3 size={17} />
                    QR Expiration
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      ["never", "Never"],
                      ["1day", "1 Day"],
                      ["7days", "7 Days"],
                      ["30days", "30 Days"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => setExpiry(value)}
                        className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                          expiry === value
                            ? "border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40"
                            : "border-slate-200 text-slate-500 hover:border-indigo-300 dark:border-slate-700"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PASSWORD */}

                <div className="mt-7">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={passwordEnabled}
                      onChange={(e) => setPasswordEnabled(e.target.checked)}
                      className="h-4 w-4 accent-indigo-600"
                    />

                    <span className="flex items-center gap-2 text-sm font-semibold dark:text-white">
                      <Lock size={16} />
                      Password protect file
                    </span>
                  </label>

                  {passwordEnabled && (
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                    />
                  )}
                </div>

                {loading && (
                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Uploading file...</span>

                      <span className="text-indigo-600">{uploadProgress}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                        style={{
                          width: `${uploadProgress}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* GENERATE */}

                <button
                  onClick={generateQR}
                  disabled={loading}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <QrCode size={20} />

                  {loading ? "Generating..." : "Generate File QR"}
                </button>
              </section>
            )}
          </div>

          {/* RIGHT */}

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5">
                <h2 className="font-bold text-slate-900 dark:text-white">
                  QR Preview
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Your generated file QR will appear here
                </p>
              </div>

              <div className="flex aspect-square items-center justify-center rounded-3xl bg-slate-50 p-8 dark:bg-slate-950">
                {qrData ? (
                  <img
                    src={qrData.image}
                    alt="Generated File QR"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <QrCode
                      size={90}
                      className="mx-auto text-slate-200 dark:text-slate-800"
                    />

                    <p className="mt-4 text-sm font-medium text-slate-400">
                      Your QR code will appear here
                    </p>
                  </div>
                )}
              </div>

              {qrData && (
                <>
                  <div className="mt-5 rounded-xl bg-slate-100 p-3 dark:bg-slate-950">
                    <p className="mb-2 text-xs font-semibold text-slate-400">
                      File URL
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate text-sm font-medium dark:text-white">
                        {qrData.url}
                      </p>

                      <button
                        onClick={copyURL}
                        className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-500/10"
                      >
                        {copied ? <Check size={17} /> : <Copy size={17} />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={downloadQR}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                  >
                    <Download size={18} />
                    Download QR
                  </button>
                </>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Feature icon={<ShieldCheck size={18} />} title="Secure" />

                <Feature icon={<Clock3 size={18} />} title="Expiry" />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-500 dark:bg-slate-950">
      {icon}
      {title}
    </div>
  );
}

export default FileToQR;
