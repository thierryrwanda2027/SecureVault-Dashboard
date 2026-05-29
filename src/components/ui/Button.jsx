export default function Button({ children, variant = 'primary', className = "", ...props }) {
  const baseStyles = "font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:ring-emerald-500";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    secondary: "bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
