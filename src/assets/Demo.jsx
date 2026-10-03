import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  QrCode,
  Link,
  Type,
  Mail,
  Phone,
  MessageCircle,
  Wifi,
  UserRound,
  Download,
  Copy,
  Check,
  RotateCcw,
  Moon,
  Sun,
  Palette,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import LogoUploader from "./components/LogoUploader";
import TemplateSelector from "./components/TemplateSelector";
import QRHistory from "./components/QRHistory";
import QRScanner from "./components/QRScanner";
import { generateQRWithLogo } from "./utils/qrGenerator";

import { QR_TEMPLATES } from "./utils/qrTemplates";

import {
  getQRHistory,
  saveQRHistory,
  deleteQRHistory,
  clearQRHistory,
} from "./utils/storage";

const TYPES = [
  ["url", "URL", Link],
  ["text", "Text", Type],
  ["email", "Email", Mail],
  ["phone", "Phone", Phone],
  ["whatsapp", "WhatsApp", MessageCircle],
  ["wifi", "Wi-Fi", Wifi],
  ["vcard", "Contact", UserRound],
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("generator");
  const [type, setType] = useState("url");

  const [value, setValue] = useState("https://example.com");

  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    wifiSsid: "",
    wifiPassword: "",
    wifiSecurity: "WPA",

    firstName: "",
    lastName: "",
    organization: "",
    phone: "",
    email: "",
    website: "",
  });

  const [foreground, setForeground] = useState("#000000");

  const [background, setBackground] = useState("#ffffff");

  const [size, setSize] = useState(500);

  const [margin, setMargin] = useState(2);

  const [errorCorrection, setErrorCorrection] = useState("H");

  const [logo, setLogo] = useState(null);

  const [logoSize, setLogoSize] = useState(80);

  const [qrPreview, setQrPreview] = useState("");

  const [history, setHistory] = useState(getQRHistory());

  const [copied, setCopied] = useState(false);

  const buildData = () => {
    if (type === "email") {
      return `mailto:${value}${
        message ? `?body=${encodeURIComponent(message)}` : ""
      }`;
    }

    if (type === "phone") {
      return `tel:${value}`;
    }

    if (type === "whatsapp") {
      return `https://wa.me/${value.replace(/\D/g, "")}${
        message ? `?text=${encodeURIComponent(message)}` : ""
      }`;
    }

    if (type === "wifi") {
      return `WIFI:T:${form.wifiSecurity};S:${form.wifiSsid};P:${form.wifiPassword};;`;
    }

    if (type === "vcard") {
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${form.lastName};${form.firstName}`,
        `FN:${form.firstName} ${form.lastName}`,
        `ORG:${form.organization}`,
        `TEL:${form.phone}`,
        `EMAIL:${form.email}`,
        `URL:${form.website}`,
        "END:VCARD",
      ].join("\n");
    }

    return value;
  };

  const generate = async () => {
    const data = buildData();

    if (!data.trim()) {
      alert("Please enter some data.");
      return;
    }

    try {
      const qr = await QRCode.toDataURL(data, {
        width: size,
        margin,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: foreground,
          light: background,
        },
      });

      let finalQR = qr;

      if (logo) {
        finalQR = await generateQRWithLogo({
          qrDataUrl: qr,
          logo,
          size,
          background,
          logoSize,
        });
      }

      setQrPreview(finalQR);

      const updated = saveQRHistory({
        type,
        data,
        preview: finalQR,
      });

      setHistory(updated);
    } catch (error) {
      console.error(error);
      alert("QR generation failed.");
    }
  };

  const download = (format) => {
    if (!qrPreview) {
      alert("Generate QR first.");
      return;
    }

    const link = document.createElement("a");

    link.href = qrPreview;

    link.download = `quickqr-${Date.now()}.${format}`;

    link.click();
  };

  const copy = async () => {
    await navigator.clipboard.writeText(buildData());

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const reset = () => {
    setType("url");
    setValue("https://example.com");
    setMessage("");

    setForeground("#000000");
    setBackground("#ffffff");

    setSize(500);
    setMargin(2);
    setErrorCorrection("H");

    setLogo(null);
    setLogoSize(80);

    setQrPreview("");
  };

  const selectTemplate = (template) => {
    setType(template.type);
    setValue(template.value);
    setForeground(template.foreground);
    setBackground(template.background);

    setQrPreview("");
  };

  const loadHistory = (item) => {
    setType(item.type);
    setValue(item.data);
    setQrPreview(item.preview);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteHistory = (id) => {
    const updated = deleteQRHistory(id);

    setHistory(updated);
  };

  const clearHistory = () => {
    clearQRHistory();
    setHistory([]);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Navbar */}

      <nav
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
          darkMode
            ? "border-slate-800 bg-slate-950/90"
            : "border-slate-200 bg-white/90"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <QrCode />
            </div>

            <div>
              <h1 className="font-bold">QuickQR</h1>

              <p className="text-xs text-slate-400">
                Professional QR Generator
              </p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="rounded-xl border border-slate-700 p-2"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>

      {/* Hero */}

      <section className="px-4 py-14 text-center">
        <div className="mx-auto max-w-3xl text-center justify-items-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-500">
            <Zap size={15} />
            Free & Private
          </span>

          <h2 className="mt-5 text-4xl font-black sm:text-6xl">
            Create Beautiful
            <span className="block text-indigo-600">QR Codes</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-500">
            Create customized QR codes for websites, WhatsApp, Wi-Fi, contacts,
            emails and more.
          </p>
          <div className="flex gap-2 px-4 py-5">
            <button
              onClick={() => setActivePage("generator")}
              className={`rounded-lg px-4 py-2 text-lg font-semibold ${
                activePage === "generator" ? "bg-indigo-600 text-white" : ""
              }`}
            >
              Generator
            </button>

            <button
              onClick={() => setActivePage("scanner")}
              className={`rounded-lg px-4 py-2 text-lg font-semibold ${
                activePage === "scanner" ? "bg-indigo-600 text-white" : ""
              }`}
            >
              Scanner
            </button>
          </div>
        </div>
      </section>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-4 pb-16">
        {activePage === "generator" ? (
          <>{/* Existing Generator UI */}</>
        ) : (
          <QRScanner darkMode={darkMode} />
        )}
        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          {/* Generator */}

          <div
            className={`rounded-3xl border p-5 sm:p-7 ${
              darkMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <h3 className="mb-4 text-lg font-bold">Choose QR Type</h3>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-7">
              {TYPES.map(([id, name, Icon]) => (
                <button
                  key={id}
                  onClick={() => {
                    setType(id);
                    setQrPreview("");
                  }}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-semibold ${
                    type === id
                      ? "border-indigo-500 bg-indigo-600 text-white"
                      : "border-slate-200 text-slate-500 dark:border-slate-800"
                  }`}
                >
                  <Icon size={18} />
                  {name}
                </button>
              ))}
            </div>

            {/* Basic */}

            {["url", "text", "email", "phone", "whatsapp"].includes(type) && (
              <div className="mt-7">
                <label className="mb-2 block text-sm font-semibold">
                  {type === "url"
                    ? "Website URL"
                    : type === "email"
                      ? "Email"
                      : type === "phone"
                        ? "Phone Number"
                        : type === "whatsapp"
                          ? "WhatsApp Number"
                          : "Text"}
                </label>

                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter your data..."
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-indigo-500 dark:border-slate-700"
                />

                {(type === "whatsapp" || type === "email") && (
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Optional message..."
                    rows={4}
                    className="mt-4 w-full resize-none rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-indigo-500 dark:border-slate-700"
                  />
                )}
              </div>
            )}

            {/* WiFi */}

            {type === "wifi" && (
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <input
                  value={form.wifiSsid}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      wifiSsid: e.target.value,
                    })
                  }
                  placeholder="Wi-Fi Name"
                  className="rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-700"
                />

                <input
                  type="password"
                  value={form.wifiPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      wifiPassword: e.target.value,
                    })
                  }
                  placeholder="Wi-Fi Password"
                  className="rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-700"
                />

                <select
                  value={form.wifiSecurity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      wifiSecurity: e.target.value,
                    })
                  }
                  className="rounded-xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
                >
                  <option value="WPA">WPA/WPA2</option>

                  <option value="WEP">WEP</option>

                  <option value="nopass">No Password</option>
                </select>
              </div>
            )}

            {/* Contact */}

            {type === "vcard" && (
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["organization", "Organization"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                  ["website", "Website"],
                ].map(([key, label]) => (
                  <input
                    key={key}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [key]: e.target.value,
                      })
                    }
                    placeholder={label}
                    className="rounded-xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-700"
                  />
                ))}
              </div>
            )}

            {/* Templates */}

            <TemplateSelector
              templates={QR_TEMPLATES}
              onSelect={selectTemplate}
              darkMode={darkMode}
            />

            {/* Logo */}

            <LogoUploader
              logo={logo}
              setLogo={setLogo}
              logoSize={logoSize}
              setLogoSize={setLogoSize}
              darkMode={darkMode}
            />

            {/* Customization */}

            <div className="mt-8">
              <div className="mb-5 flex items-center gap-2">
                <Palette size={19} className="text-indigo-500" />

                <h3 className="font-bold">Customization</h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Color
                  label="QR Color"
                  value={foreground}
                  setValue={setForeground}
                />

                <Color
                  label="Background"
                  value={background}
                  setValue={setBackground}
                />

                <Range
                  label="Size"
                  value={size}
                  min={200}
                  max={1000}
                  setValue={setSize}
                />

                <Range
                  label="Margin"
                  value={margin}
                  min={0}
                  max={10}
                  setValue={setMargin}
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold">
                  Error Correction
                </label>

                <div className="grid grid-cols-4 gap-2">
                  {["L", "M", "Q", "H"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setErrorCorrection(level)}
                      className={`rounded-xl border p-3 font-semibold ${
                        errorCorrection === level
                          ? "border-indigo-500 bg-indigo-600 text-white"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="mt-8 flex gap-3">
              <button
                onClick={generate}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 font-bold text-white hover:bg-indigo-700"
              >
                <QrCode size={19} />
                Generate QR
              </button>

              <button
                onClick={reset}
                className="rounded-xl border border-slate-200 px-5 dark:border-slate-700"
              >
                <RotateCcw />
              </button>
            </div>
          </div>

          {/* Preview */}

          <div
            className={`h-fit rounded-3xl border p-5 sm:p-7 lg:sticky lg:top-24 ${
              darkMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold">QR Preview</h3>

                <p className="text-xs text-slate-400">Live generated QR</p>
              </div>

              <ShieldCheck className="text-green-500" />
            </div>

            <div className="flex min-h-[350px] items-center justify-center rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
              {qrPreview ? (
                <motion.img
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  src={qrPreview}
                  alt="Generated QR Code"
                  className="max-w-full rounded-xl bg-white p-3 shadow-xl"
                />
              ) : (
                <div className="text-center text-slate-400">
                  <QrCode size={60} className="mx-auto mb-4 opacity-30" />

                  <p>Generate QR to see preview</p>
                </div>
              )}
            </div>

            {qrPreview && (
              <>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => download("png")}
                    className="flex items-center justify-center gap-1 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white"
                  >
                    <Download size={16} />
                    PNG
                  </button>

                  <button
                    onClick={() => download("jpg")}
                    className="flex items-center justify-center gap-1 rounded-xl border py-3 text-sm font-bold"
                  >
                    <Download size={16} />
                    JPG
                  </button>

                  <button
                    onClick={() => download("png")}
                    className="flex items-center justify-center gap-1 rounded-xl border py-3 text-sm font-bold"
                  >
                    <Download size={16} />
                    HD
                  </button>
                </div>

                <button
                  onClick={copy}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy />
                      Copy QR Data
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      {/* History */}

      <QRHistory
        history={history}
        onLoad={loadHistory}
        onDelete={deleteHistory}
        onClear={clearHistory}
        darkMode={darkMode}
      />

      {/* Features */}

      <section className="border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3">
          <Feature
            icon={Zap}
            title="Instant"
            text="Generate QR codes directly in your browser."
          />

          <Feature
            icon={Palette}
            title="Customizable"
            text="Colors, logo, size and error correction."
          />

          <Feature
            icon={ShieldCheck}
            title="Private"
            text="Your data stays inside your browser."
          />
        </div>
      </section>

      <footer className="py-10 text-center">
        <div className="flex justify-center gap-2 font-bold">
          <QrCode className="text-indigo-500" />
          QuickQR
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Free Professional QR Code Generator
        </p>
      </footer>
    </div>
  );
}

/* ----------------------------- */
/* Components */
/* ----------------------------- */

function Color({ label, value, setValue }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>

      <div className="flex gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-12 w-14"
        />

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-transparent px-4 font-mono dark:border-slate-700"
        />
      </div>
    </div>
  );
}

function Range({ label, value, min, max, setValue }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <label className="font-semibold">{label}</label>

        <span className="text-indigo-500">{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
        <Icon size={20} />
      </div>

      <div>
        <h3 className="font-bold">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
}

export default App;
