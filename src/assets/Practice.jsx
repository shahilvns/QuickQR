{
  /* Navbar */
}

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

        <p className="text-xs text-slate-400">Professional QR Generator</p>
      </div>
    </div>

    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="rounded-xl border border-slate-700 p-2"
    >
      {darkMode ? <Sun /> : <Moon />}
    </button>
  </div>
</nav>;
