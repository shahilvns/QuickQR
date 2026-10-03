import { Globe, MessageCircle, Wifi, UserRound } from "lucide-react";

const icons = {
  website: Globe,
  whatsapp: MessageCircle,
  instagram: MessageCircle,
  youtube: MessageCircle,
  wifi: Wifi,
  contact: UserRound,
};

function TemplateSelector({ templates, onSelect, darkMode }) {
  return (
    <div className="mt-8">
      <div className="mb-4">
        <h3 className="font-bold">Quick Templates</h3>

        <p className="mt-1 text-xs text-slate-400">
          Start with a ready-made QR template
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {templates.map((template) => {
          const Icon = icons[template.id];

          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${
                darkMode
                  ? "border-slate-800 bg-slate-950 hover:border-indigo-500"
                  : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${template.foreground}15`,
                  color: template.foreground,
                }}
              >
                {Icon && <Icon size={18} />}
              </div>

              <span className="text-sm font-semibold">{template.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TemplateSelector;
