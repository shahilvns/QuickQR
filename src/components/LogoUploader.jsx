import { Upload, X, Image as ImageIcon } from "lucide-react";

function LogoUploader({ logo, setLogo, logoSize, setLogoSize, darkMode }) {
  const handleUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Logo size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLogo(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold">Add Logo</h3>

          <p
            className={`mt-1 text-xs ${
              darkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Add your brand logo to the center
          </p>
        </div>

        {logo && (
          <button
            onClick={() => setLogo(null)}
            className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {!logo ? (
        <label
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition ${
            darkMode
              ? "border-slate-700 hover:border-indigo-500 hover:bg-slate-900"
              : "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50"
          }`}
        >
          <div className="mb-3 rounded-xl bg-indigo-500/10 p-3 text-indigo-500">
            <Upload size={24} />
          </div>

          <p className="text-sm font-semibold">Upload Logo</p>

          <p className="mt-1 text-xs text-slate-400">PNG, JPG, SVG • Max 2MB</p>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div
          className={`rounded-2xl border p-4 ${
            darkMode
              ? "border-slate-800 bg-slate-950"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Uploaded logo"
              className="h-16 w-16 rounded-xl border object-contain bg-white p-1"
            />

            <div>
              <p className="font-semibold">Logo uploaded</p>

              <p className="text-xs text-slate-400">
                Logo will appear in QR center
              </p>
            </div>

            <ImageIcon size={20} className="ml-auto text-green-500" />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm">
              <span>Logo Size</span>

              <span className="text-indigo-500">{logoSize}px</span>
            </div>

            <input
              type="range"
              min="40"
              max="140"
              value={logoSize}
              onChange={(e) => setLogoSize(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LogoUploader;
