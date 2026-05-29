git config --global user.email "theniyonkuru@gmail.com"
git config --global user.name "Thierryrwanda2027"

git init
git add package.json vite.config.js index.html
git commit -m "chore: initialize React project with Vite"

git add src/index.css
git commit -m "feat: setup Tailwind V4 cyber-secure theme"

git add src/components/ui/
git commit -m "refactor: extract UI components (Button, Badge)"

git add src/components/FolderNode.jsx src/components/FileNode.jsx
git commit -m "feat: implement recursive FolderNode & FileNode engine"

git add src/components/PropertiesPanel.jsx
git commit -m "feat: add File Properties Inspector panel"

git add src/App.jsx src/components/FileExplorer.jsx
git commit -m "perf: memoize recursive tree search and node filtering"

git add .
git commit -m "feat: implement enterprise a11y (ARIA) & keyboard focus management"

git add README.md
git commit -m "docs: finalize project documentation, design links, and gatekeeper requirements"
