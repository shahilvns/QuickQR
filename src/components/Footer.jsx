import { Link } from "react-router-dom";
import { QrCode, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-colors duration-300 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}

          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <QrCode size={22} />
              </div>

              <span className="text-xl font-black">
                Quick<span className="text-indigo-600">QR</span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              Create and scan QR codes quickly and easily. QuickQR provides free
              online QR tools without requiring registration.
            </p>
          </div>

          {/* Tools */}

          <div>
            <h3 className="font-bold">QR Tools</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <Link
                className="block hover:text-indigo-600"
                to="/qr-code-generator"
              >
                QR Generator
              </Link>

              <Link className="block hover:text-indigo-600" to="/qr-scanner">
                QR Scanner
              </Link>

              <Link className="block hover:text-indigo-600" to="/wifi-qr-code">
                WiFi QR
              </Link>

              <Link
                className="block hover:text-indigo-600"
                to="/whatsapp-qr-code"
              >
                WhatsApp QR
              </Link>
            </div>
          </div>

          {/* Company */}

          <div>
            <h3 className="font-bold">Company</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <Link className="block hover:text-indigo-600" to="/about">
                About
              </Link>

              <Link className="block hover:text-indigo-600" to="/contact">
                Contact
              </Link>

              <Link
                className="block hover:text-indigo-600"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>

              <Link className="block hover:text-indigo-600" to="/terms">
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 sm:flex-row">
          <p>© {new Date().getFullYear()} QuickQR. All rights reserved.</p>

          <div className="flex gap-4">
            <a
              href="mailto:hello@yourdomain.com"
              className="hover:text-indigo-600"
            >
              <Mail size={18} />
            </a>

            <a href="#" className="hover:text-indigo-600">
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
