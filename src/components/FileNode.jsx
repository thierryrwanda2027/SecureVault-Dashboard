import { memo, useCallback } from 'react';

const FileNode = memo(function FileNode({ 
  node, 
  depth, 
  selectedFile, 
  setSelectedFile, 
  searchQuery 
}) {
  const isSelected = selectedFile?.id === node.id;
  const matchesSearch = searchQuery && node.name.toLowerCase().includes(searchQuery.toLowerCase());

  const getFileIcon = (name) => {
    if (name.endsWith('.pdf')) return '📄';
    if (name.endsWith('.png') || name.endsWith('.svg')) return '🖼️';
    if (name.endsWith('.docx') || name.endsWith('.txt')) return '📝';
    if (name.endsWith('.xlsx')) return '📊';
    return '📄';
  };

  const handleClick = useCallback(() => {
    setSelectedFile(node);
  }, [node, setSelectedFile]);

  return (
    <div 
      role="treeitem"
      aria-selected={isSelected}
      aria-label={node.name}
      className={`explorer-item flex items-center py-1 px-2 cursor-pointer rounded transition-colors select-none focus:outline-none focus:ring-1 focus:ring-emerald-500
        ${isSelected ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-800/50' : 'hover:bg-neutral-800 focus:bg-neutral-700 border border-transparent'}
        ${!isSelected && matchesSearch ? 'text-emerald-300' : ''}
        ${!isSelected && !matchesSearch ? 'text-neutral-400' : ''}
      `}
      style={{ paddingLeft: `${depth * 1.5 + 1.5}rem` }}
      tabIndex={0}
      data-id={node.id}
      data-type="file"
      onClick={handleClick}
    >
      <span className="mr-2 opacity-80" aria-hidden="true">{getFileIcon(node.name)}</span>
      <span className="text-sm truncate">{node.name}</span>
    </div>
  );
});

export default FileNode;
