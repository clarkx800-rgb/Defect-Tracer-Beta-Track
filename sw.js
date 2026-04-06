// CHANGE THIS NAME EVERY TIME YOU UPDATE YOUR CODE (e.g., v2, v3, v4)
const CACHE_NAME = 'defect-tracker-v0'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './exceljs.min.js',
  './jspdf.umd.min.js'
];

// 1. Install Event: Cache the new files
self.addEventListener('install', event => {
  self.skipWaiting(); // Forces the new service worker to take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: Delete the old files!
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cache name doesn't match our current version, delete it
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all open tabs immediately
  );
});

// 3. Fetch Event: Serve from cache, but fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
