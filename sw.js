// TimeCard Service Worker — offline-first cache
const CACHE = 'timecard-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // For navigation requests — serve from cache, fall back to network
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
    return;
  }
  // For Google Fonts and other external assets — network-first
  if (e.request.url.includes('fonts.googleapis') || e.request.url.includes('fonts.gstatic')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // Everything else — cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(response => {
      return caches.open(CACHE).then(cache => {
        cache.put(e.request, response.clone());
        return response;
      });
    }))
  );
});
