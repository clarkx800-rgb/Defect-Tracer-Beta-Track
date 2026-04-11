// 1. IMPORT YOUR TEMPLATE DATABASE!
// This allows the Service Worker to read your template_config.js file directly.
importScripts('template_config.js');

// 2. CACHE VERSION
// UPDATE THIS NUMBER every time you add a new template to force phones to redownload!
const CACHE_NAME = 'defect-tracer-v3.0.77';

// 3. CORE APP FILES (The basic files needed to run the app)
const coreFilesToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.png',
    '/db_expo.js',
    '/db_millennium.js',
    '/db_evergreen.js',
    '/themes.js',
    '/instructions.js',
    '/template_config.js', 
    'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// 4. AUTO-EXTRACT TEMPLATES
// The Service Worker automatically loops through your config file and grabs every template URL
const templateUrls = [];
if (typeof templateLibrary !== 'undefined') {
    for (let category in templateLibrary) {
        templateLibrary[category].forEach(template => {
            // Adds the URL to our caching list
            templateUrls.push(template.url); 
        });
    }
}

// Combine the core files and the auto-extracted template files into one master list
const urlsToCache = coreFilesToCache.concat(templateUrls);


// INSTALL STEP: Cache all files, but don't crash if one is missing
self.addEventListener('install', event => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache: ', CACHE_NAME);
            console.log('Caching the following files:', urlsToCache);
            
            // Cache files individually so one missing file doesn't fail the whole installation
            return Promise.all(
                urlsToCache.map(url => {
                    return cache.add(url).catch(err => {
                        console.warn('SW Install warning: Failed to cache', url, err);
                    });
                })
            );
        })
    );
});

// ACTIVATE STEP: Delete old caches to free up memory on the phone
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// FETCH STEP: Intercept network requests (Cache-First Strategy)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // 1. If the file is in the cache, return it instantly (Offline support)
            if (cachedResponse) {
                return cachedResponse;
            }

            // 2. If it's not in the cache, try to fetch it from the internet
            return fetch(event.request).then(networkResponse => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(err => {
                console.log('Fetch failed; offline and file not in cache.', event.request.url);
            });
        })
    );
});
