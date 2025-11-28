// Service Worker - Advanced Caching & Offline Support
const CACHE_NAME = 'ai-expert-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/js/app.js',
  '/js/auto-fix.js',
  '/js/config-engine.js',
  '/js/performance-engine.js',
  '/js/error-logger-light.js',
  '/js/revenue-engine.js'
];

// Install - Cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => 
      cache.addAll(STATIC_ASSETS).catch(() => console.log('Partial cache'))
    )
  );
  self.skipWaiting();
});

// Activate - Cleanup old cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => 
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Fetch - Smart caching strategy
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const { request } = event;
  const url = new URL(request.url);

  // API requests: network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).then(res => {
        caches.open(CACHE_NAME).then(c => c.put(request, res.clone()));
        return res;
      }).catch(() => caches.match(request))
    );
    return;
  }

  // Static: cache first, fallback to network
  event.respondWith(
    caches.match(request).then(cached => 
      cached || fetch(request).then(res => {
        caches.open(CACHE_NAME).then(c => c.put(request, res.clone()));
        return res;
      })
    )
  );
});
