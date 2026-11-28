// Aviation Ops Sim JP Pro — Offline-First Service Worker (PWA)
const CACHE_NAME = 'aviation-ops-sim-jp-pro-v30';
const CORE_ASSETS = [
  './',
  './index.html',
  './vendor/three.module.min.js',
  './vendor/GLTFLoader.js',
  './vendor/BufferGeometryUtils.js',
  './vendor/models/B787_nologo.glb',
  './vendor/models/A350_nologo.glb',
  './vendor/models/A320_nologo.glb',
  './vendor/models/B737_nologo.glb',
  './public/manifest.json',
  './public/icon.svg',
  './src/styles/app.css',
  './src/styles/mobile.css',
  './src/main.js',
  './src/core/state.js',
  './src/core/commandPalette.js',
  './src/core/jaPhraseWrap.js',
  './src/core/roadmap.js',
  './src/data/aircraft.js',
  './src/data/airports.js',
  './src/data/airport_geo_data.js',
  './src/data/centrairNgo.js',
  './src/data/quizBank.js',
  './src/data/quizBankTg2.js',
  './src/data/quizBankS2Official.js',
  './src/data/dictionary.js',
  './src/engines/wbEngine.js',
  './src/engines/audioEngine.js',
  './src/three3d/aircraftBuilder3D.js',
  './src/three3d/gseLibrary3D.js',
  './src/three3d/envLighting.js',
  './src/three3d/aircraft_3d_models.js',
  './src/three3d/crewBuilder3D.js',
  './src/three3d/AirportScene3D.js',
  './src/three3d/TurnaroundScene3D.js',
  './src/modules/dashboard.js',
  './src/modules/wbModule.js',
  './src/modules/airport3dModule.js',
  './src/modules/opsModules.js',
  './src/modules/uldBuildupModule.js',
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

// Network-first for the app's own code/pages (so a new deploy shows up on the next open),
// cache-first for heavy static assets (GLB models, vendor libs, images). Offline → cache fallback.
const HEAVY = /\.(glb|gltf|png|jpe?g|webp|svg|woff2?|mp3|wav)$|\/vendor\//i;

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const putCache = resp => {
    if (resp && (resp.status === 200 || resp.type === 'cors')) {
      const clone = resp.clone();
      caches.open(CACHE_NAME).then(c => c.put(req, clone)).catch(() => {});
    }
    return resp;
  };
  if (url.origin === location.origin && !HEAVY.test(url.pathname)) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' }).then(putCache).catch(() =>
        caches.match(req).then(c => c || caches.match('./index.html')))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(putCache).catch(() => cached))
  );
});
