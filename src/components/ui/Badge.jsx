export default function Badge({ children, className = "" }) {
  return (
    <span className={`px-2 py-1 bg-emerald-950 text-emerald-400 text-xs rounded border border-emerald-800/50 font-mono ${className}`}>
      {children}
    </span>
  );
}
