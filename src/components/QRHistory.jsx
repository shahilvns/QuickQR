import { Clock3, Copy, Trash2, X } from "lucide-react";

function QRHistory({ history, onLoad, onDelete, onClear, darkMode }) {
  if (!history.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div
        className={`rounded-3xl border p-5 sm:p-7 ${
          darkMode
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Clock3 size={19} className="text-indigo-500" />

              <h2 className="font-bold">QR History</h2>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Stored locally in your browser
            </p>
          </div>

          <button
            onClick={onClear}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/10"
          >
            <Trash2 size={15} />
            Clear All
          </button>
        </div>

        <div className="grid gap-3">
          {history.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 rounded-2xl border p-3 ${
                darkMode
                  ? "border-slate-800 bg-slate-950"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="h-16 w-16 shrink-0 rounded-xl bg-white p-1">
                <img
                  src={item.preview}
                  alt="QR history"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.type}</p>

                <p className="mt-1 truncate text-xs text-slate-400">
                  {item.data}
                </p>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => onLoad(item)}
                  className="rounded-lg p-2 text-indigo-500 hover:bg-indigo-500/10"
                  title="Load"
                >
                  <Copy size={17} />
                </button>

                <button
                  onClick={() => onDelete(item.id)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                  title="Delete"
                >
                  <X size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QRHistory;
