# SecureVault Dashboard

A modern, high-performance File Explorer UI designed for enterprise cloud security clients, built as part of the AmaliTech Frontend Engineering challenge.

## Features

- **Recursive Folder Structure**: Infinitely scalable folder rendering.
- **Keyboard Accessible**: Full navigation without a mouse (Arrow keys + Enter).
- **Properties Inspector**: Detailed metadata view for selected files.
- **Wildcard Feature (Search & Auto-Expand)**: Real-time search that highlights matches and automatically expands parent folders to reveal nested matching items.

## Design System

The application follows a "cyber-secure, precise, and fast" aesthetic (Dark Mode).

- **Design File**: [INSERT_YOUR_FIGMA_LINK_HERE] (Anyone with the link can view)

## Tech Stack

- **React (Vite)**
- **Tailwind CSS v4** (For utility-first styling without external component libraries)

## Recursive Strategy

The `FileExplorer` component passes the parsed JSON to a `TreeNode` component. If a node is a folder (`type === 'folder'`), it renders its own details and then maps over its `children` array, recursively calling `<TreeNode />` for each child. This ensures infinite depth scalability (whether 2 or 20 levels deep) without hardcoding nested loops, maintaining an O(N) rendering complexity relative to the visible nodes.

## Wildcard Feature: State-Preserving Deep Search

I implemented this because in enterprise file vaults (like legal or finance), users rarely know the exact folder path of a 3-year-old document. A real-time search that auto-expands the tree and highlights the file saves massive operational time. Furthermore, restoring the tree's exact state when the search is cleared prevents UX frustration, ensuring seamless workflow continuity.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SecureVault-Dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Keyboard Navigation

- **Arrow Down / Arrow Up**: Move focus to the next/previous visible item.
- **Arrow Right**: Expand a folder (if collapsed) or move to its first child (if expanded).
- **Arrow Left**: Collapse a folder (if expanded) or move to its parent folder.
- **Enter**: Select a file to view its metadata in the Inspector.
