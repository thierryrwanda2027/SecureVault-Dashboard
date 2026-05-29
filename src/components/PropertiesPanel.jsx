import Button from './ui/Button';
import Badge from './ui/Badge';

export default function PropertiesPanel({ file }) {
  if (!file) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-neutral-600">
        <div className="w-24 h-24 mb-6 opacity-20">
          <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4c0-1.11.89-2 2-2m5 18v-3h2v3h-2m-1-4v-6h4v6h-4z" />
          </svg>
        </div>
        <p className="text-lg font-medium tracking-wide">NO FILE SELECTED</p>
        <p className="text-sm mt-2 opacity-50">Select a file from the vault to view metadata.</p>
      </div>
    );
  }

  const getExtension = (name) => {
    const parts = name.split('.');
    return parts.length > 1 ? parts.pop().toUpperCase() : 'UNKNOWN';
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-neutral-950">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-100 truncate pr-4">File Inspector</h2>
          <Badge>SECURE</Badge>
        </div>
        <div className="p-6 space-y-6">
          
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1 font-semibold">File Name</p>
            <p className="text-base text-neutral-200 font-mono break-all">{file.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1 font-semibold">Type</p>
              <p className="text-base text-neutral-200">{getExtension(file.name)} Document</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1 font-semibold">Size</p>
              <p className="text-base text-neutral-200">{file.size}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1 font-semibold">Internal ID</p>
            <p className="text-sm text-neutral-400 font-mono bg-neutral-950 p-2 rounded border border-neutral-800">{file.id}</p>
          </div>

        </div>
        
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex gap-3">
          <Button variant="primary" className="flex-1">Open File</Button>
          <Button variant="secondary">Share</Button>
        </div>
      </div>
    </div>
  );
}
