import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import FolderNode from './FolderNode';
import FileNode from './FileNode';
import PropertiesPanel from './PropertiesPanel';
import data from '../data.json';

function buildParentMap(nodes, parentId = null, map = {}) {
  for (const node of nodes) {
    map[node.id] = parentId;
    if (node.children) {
      buildParentMap(node.children, node.id, map);
    }
  }
  return map;
}

const parentMap = buildParentMap(data);

export default function FileExplorer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // State preservation for search
  const [preSearchExpanded, setPreSearchExpanded] = useState(null);
  const explorerRef = useRef(null);

  // Auto-expand logic for search with memoization
  useEffect(() => {
    if (!searchQuery) {
      // Revert to pre-search state if we saved one
      if (preSearchExpanded) {
        setExpandedFolders(preSearchExpanded);
        setPreSearchExpanded(null);
      }
      return;
    }
    
    // Save state before searching if not already saved
    if (!preSearchExpanded) {
      setPreSearchExpanded({ ...expandedFolders });
    }

    const term = searchQuery.toLowerCase();
    const newExpanded = { ...expandedFolders };
    let changed = false;

    const searchNodes = (nodes) => {
      let hasMatch = false;
      for (const node of nodes) {
        let isMatch = node.name.toLowerCase().includes(term);
        if (node.children) {
          const childMatch = searchNodes(node.children);
          if (childMatch) {
            newExpanded[node.id] = true;
            changed = true;
            hasMatch = true;
          }
        }
        if (isMatch) hasMatch = true;
      }
      return hasMatch;
    };

    searchNodes(data);
    if (changed) {
      setExpandedFolders(newExpanded);
    }
  }, [searchQuery]); // Note: intentional missing dep on expandedFolders to prevent infinite loop

  const toggleFolder = useCallback((id, forceState) => {
    setExpandedFolders(prev => ({
      ...prev,
      [id]: forceState !== undefined ? forceState : !prev[id]
    }));
  }, []);

  const handleKeyDown = useCallback((e) => {
    const items = Array.from(explorerRef.current.querySelectorAll('.explorer-item'));
    const currentIndex = items.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentIndex < items.length - 1) items[currentIndex + 1].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentIndex > 0) items[currentIndex - 1].focus();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentIndex !== -1) {
        const item = items[currentIndex];
        const id = item.dataset.id;
        const type = item.dataset.type;
        const isExpanded = expandedFolders[id];
        
        if (type === 'folder') {
          if (!isExpanded) {
            toggleFolder(id, true);
          } else if (currentIndex < items.length - 1) {
            items[currentIndex + 1].focus();
          }
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentIndex !== -1) {
        const item = items[currentIndex];
        const id = item.dataset.id;
        const type = item.dataset.type;
        const isExpanded = expandedFolders[id];
        
        if (type === 'folder' && isExpanded) {
          toggleFolder(id, false);
        } else {
          // Move to parent folder
          const parentId = parentMap[id];
          if (parentId) {
            const parentEl = items.find(el => el.dataset.id === parentId);
            if (parentEl) parentEl.focus();
          }
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentIndex !== -1) {
        items[currentIndex].click();
      }
    }
  }, [expandedFolders, toggleFolder]);

  // Memoized filter function to pass down cleanly
  const filterNode = useCallback((node) => {
    if (!searchQuery) return true;
    if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    if (node.children) {
      return node.children.some(filterNode);
    }
    return false;
  }, [searchQuery]);

  // Memoized root nodes filtering to save computation cycles
  const filteredData = useMemo(() => {
    return data.filter(filterNode);
  }, [filterNode]);

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-200 font-mono">
      <div className="w-1/3 min-w-[300px] border-r border-neutral-800 flex flex-col bg-neutral-900">
        <div className="p-4 border-b border-neutral-800">
          <h1 className="text-xl font-bold text-emerald-400 mb-4 tracking-wider flex items-center">
             SECURE_VAULT<span className="animate-pulse">_</span>
          </h1>
          <input
            type="text"
            placeholder="Search vault..."
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search vault"
          />
        </div>
        
        <div 
          className="flex-1 overflow-y-auto p-2"
          ref={explorerRef}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          role="tree"
          aria-label="SecureVault File Explorer"
        >
          {filteredData.map((node) => (
            node.type === 'folder' ? (
              <FolderNode 
                key={node.id} 
                node={node} 
                depth={0} 
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                searchQuery={searchQuery}
                filterNode={filterNode}
              />
            ) : (
              <FileNode 
                key={node.id} 
                node={node} 
                depth={0}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                searchQuery={searchQuery}
              />
            )
          ))}
        </div>
      </div>

      <div className="flex-1 bg-neutral-950 flex flex-col">
        <PropertiesPanel file={selectedFile} />
      </div>
    </div>
  );
}
