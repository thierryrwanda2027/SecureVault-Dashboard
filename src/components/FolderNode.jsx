import { memo } from 'react';
import FileNode from './FileNode';

const FolderNode = memo(function FolderNode({ 
  node, 
  depth, 
  expandedFolders, 
  toggleFolder, 
  selectedFile, 
  setSelectedFile, 
  searchQuery,
  filterNode 
}) {
  const isExpanded = !!expandedFolders[node.id];
  const matchesSearch = searchQuery && node.name.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div className="flex flex-col" role="treeitem" aria-expanded={isExpanded} aria-label={node.name}>
      <div 
        className={`explorer-item flex items-center py-1 px-2 cursor-pointer rounded hover:bg-neutral-800 focus:outline-none focus:bg-neutral-700 focus:ring-1 focus:ring-emerald-500 transition-colors select-none ${matchesSearch ? 'text-emerald-300' : 'text-neutral-300'}`}
        style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
        tabIndex={0}
        data-id={node.id}
        data-type="folder"
        onClick={() => toggleFolder(node.id)}
      >
        <span className="mr-2 w-4 text-center text-xs text-neutral-500" aria-hidden="true">
          {isExpanded ? '▼' : '▶'}
        </span>
        <span className="mr-2 text-yellow-500" aria-hidden="true">📁</span>
        <span className="text-sm truncate">{node.name}</span>
      </div>

      {isExpanded && node.children && (
        <div className="flex flex-col" role="group">
          {node.children.filter(filterNode).map(child => 
            child.type === 'folder' ? (
              <FolderNode 
                key={child.id} 
                node={child} 
                depth={depth + 1} 
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                searchQuery={searchQuery}
                filterNode={filterNode}
              />
            ) : (
              <FileNode 
                key={child.id} 
                node={child} 
                depth={depth + 1}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                searchQuery={searchQuery}
              />
            )
          )}
        </div>
      )}
    </div>
  );
});

export default FolderNode;
