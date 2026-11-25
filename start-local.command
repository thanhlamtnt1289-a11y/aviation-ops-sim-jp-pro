#!/bin/bash
cd "$(dirname "$0")"
echo "=============================================="
echo "  Aviation Ops Sim JP Pro — Local Launcher"
echo "=============================================="
if command -v npm >/dev/null 2>&1; then
  if [ ! -d "node_modules" ]; then
    echo "Installing Vite + Three.js..."
    npm install
  fi
  echo "Starting Vite Dev Server at http://localhost:5173 ..."
  npm run dev
else
  echo "Node.js not detected -> Launching zero-install Python3 PWA server at http://localhost:8080 ..."
  (sleep 1 && open "http://localhost:8080") &
  python3 -m http.server 8080
fi
