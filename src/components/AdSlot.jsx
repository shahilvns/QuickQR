function AdSlot({ className = "", label = "Advertisement" }) {
  return (
    <div
      className={`flex min-h-[100px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 ${className}`}
    >
      {label}
    </div>
  );
}

export default AdSlot;
