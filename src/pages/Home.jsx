import { Link } from "react-router-dom";
import {
  QrCode,
  ScanLine,
  Wifi,
  MessageCircle,
  UserRound,
  Globe,
  ArrowRight,
  File,
} from "lucide-react";
import { Sparkles } from "lucide-react";

import SEO from "../components/SEO";

const tools = [
  {
    title: "QR Code Generator",
    description: "Create customizable QR codes for any content.",
    path: "/qr-code-generator",
    icon: QrCode,
  },
  {
    title: "QR Scanner",
    description: "Scan QR codes using camera or image upload.",
    path: "/qr-scanner",
    icon: ScanLine,
  },
  {
    title: "Smart QR",
    description:
      "Create a dynamic QR profile with links, contact information and analytics.",
    path: "/smart-qr",
    icon: Sparkles,
  },
  {
    title: "WiFi QR Code",
    description: "Create QR codes for instant WiFi connection.",
    path: "/wifi-qr-code",
    icon: Wifi,
  },
  {
    title: "WhatsApp QR",
    description: "Create QR codes for WhatsApp conversations.",
    path: "/whatsapp-qr-code",
    icon: MessageCircle,
  },
  {
    title: "vCard QR",
    description: "Turn your contact information into a QR code.",
    path: "/vcard-qr-code",
    icon: UserRound,
  },
  {
    title: "URL QR Code",
    description: "Convert any website URL into a QR code.",
    path: "/url-qr-code",
    icon: Globe,
  },
  {
    title: "File to QR",
    description: "Convert any File into a QR code.",
    path: "/file-to-qr",
    icon: File,
  },
];

function Home() {
  return (
    <>
      <SEO
        title="QuickQR - Free QR Code Generator & Scanner"
        description="Free online QR Code Generator and QR Scanner. Create QR codes for websites, WiFi, WhatsApp, contacts and more."
        canonical="/"
      />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <section className="px-4 py-20 text-center sm:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20">
              <QrCode size={34} />
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-tight sm:text-7xl dark:text-white">
              Free QR Code
              <span className="block text-indigo-600">Generator & Scanner</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
              Create, customize and scan QR codes instantly. No registration
              required.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/qr-code-generator"
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white hover:bg-indigo-700"
              >
                Create QR Code
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/qr-scanner"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              >
                <ScanLine size={18} />
                Scan QR Code
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                    <Icon size={23} />
                  </div>

                  <h2 className="mt-5 text-lg font-bold dark:text-white">
                    {tool.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {tool.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                    Open Tool
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
