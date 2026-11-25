// Aviation Ops Sim JP Pro — Offline-First Service Worker (PWA)
const CACHE_NAME = 'aviation-ops-sim-jp-pro-v12';
const CORE_ASSETS = [
  './',
  './index.html',
  './vendor/three.module.min.js',
  './public/manifest.json',
  './public/icon.svg',
  './src/styles/app.css',
  './src/main.js',
  './src/core/state.js',
  './src/core/commandPalette.js',
  './src/data/aircraft.js',
  './src/data/airports.js',
  './src/data/airport_geo_data.js',
  './src/data/centrairNgo.js',
  './src/data/quizBank.js',
  './src/data/dictionary.js',
  './src/engines/wbEngine.js',
  './src/engines/audioEngine.js',
  './src/three3d/aircraftBuilder3D.js',
  './src/three3d/aircraft_3d_models.js',
  './src/three3d/crewBuilder3D.js',
  './src/three3d/AirportScene3D.js',
  './src/three3d/TurnaroundScene3D.js',
  './src/modules/dashboard.js',
  './src/modules/wbModule.js',
  './src/modules/airport3dModule.js',
  './src/modules/opsModules.js',
  './src/modules/quizModule.js',
  './src/modules/fieldDrillsModule.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first with background refresh; also caches Three.js ESM CDN modules for 100% offline reuse!
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(resp => {
        if (resp && (resp.status === 200 || resp.type === 'cors')) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {});
        }
        return resp;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});
