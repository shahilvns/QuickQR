// import { Link, NavLink } from "react-router-dom";
// import { QrCode, ScanLine, Menu, X } from "lucide-react";
// import { useState } from "react";

// function Navbar() {
//   const [open, setOpen] = useState(false);

//   const links = [
//     {
//       name: "Generator",
//       path: "/qr-code-generator",
//     },
//     {
//       name: "Scanner",
//       path: "/qr-scanner",
//     },
//     {
//       name: "WiFi QR",
//       path: "/wifi-qr-code",
//     },
//     {
//       name: "WhatsApp QR",
//       path: "/whatsapp-qr-code",
//     },
//   ];

//   return (
//     <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
//         {/* Logo */}

//         <Link to="/" className="flex items-center gap-2">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
//             <QrCode size={22} />
//           </div>

//           <span className="text-xl font-black tracking-tight">
//             Quick<span className="text-indigo-600">QR</span>
//           </span>
//         </Link>

//         {/* Desktop */}

//         <nav className="hidden items-center gap-1 md:flex">
//           {links.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 `rounded-lg px-3 py-2 text-sm font-medium transition ${
//                   isActive
//                     ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10"
//                     : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
//                 }`
//               }
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </nav>

//         <Link
//           to="/qr-code-generator"
//           className="hidden rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 md:block"
//         >
//           Create QR
//         </Link>

//         {/* Mobile button */}

//         <button
//           onClick={() => setOpen(!open)}
//           className="rounded-lg p-2 md:hidden"
//         >
//           {open ? <X size={23} /> : <Menu size={23} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}

//       {open && (
//         <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800 md:hidden">
//           <div className="space-y-1">
//             {links.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setOpen(false)}
//                 className="block rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Navbar;

import { Link, NavLink } from "react-router-dom";
import { QrCode, ScanLine, Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const links = [
    {
      name: "Generator",
      path: "/qr-code-generator",
    },
    {
      name: "Scanner",
      path: "/qr-scanner",
    },
    {
      name: "File to QR",
      path: "/file-to-qr",
    },
    {
      name: "Smart QR",
      path: "/smart-qr",
    },
    {
      name: "WiFi QR",
      path: "/wifi-qr-code",
    },
    {
      name: "WhatsApp QR",
      path: "/whatsapp-qr-code",
    },
  ];

  // Apply dark mode
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <QrCode size={22} />
          </div>

          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Quick<span className="text-indigo-600">QR</span>
            <p className="text-xs text-slate-400">Professional QR Generator</p>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-yellow-400 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Create QR */}
          <Link
            to="/qr-code-generator"
            className="hidden rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 md:block"
          >
            Create QR
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Create QR */}
            <Link
              to="/qr-code-generator"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-indigo-600 px-4 py-3 text-center font-bold text-white hover:bg-indigo-700"
            >
              Create QR
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
