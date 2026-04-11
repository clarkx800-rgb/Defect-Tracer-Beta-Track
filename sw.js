// 1. IMPORT YOUR TEMPLATE DATABASE!
// This allows the Service Worker to read your template_config.js file directly.
importScripts('template_config.js');

// 2. CACHE VERSION
// UPDATE THIS NUMBER every time you add a new template or update code to force phones to redownload!
const CACHE_NAME = 'defect-tracer-v4.0.14';

// 3. CORE APP FILES (The modular architecture)
const coreFilesToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.png',
    '/styles.css',
    '/data_engine.js',
    '/ui_engine.js',
    '/app_core.js',
    '/db_expo.js',
    '/db_millennium.js',
    '/db_evergreen.js',
    '/themes.js',
    '/instructions.js',
    '/template_config.js', 
    '/exceljs.min.js',
    '/jspdf.umd.min.js'
];

// 4. AUTO-EXTRACT TEMPLATES
const templateUrls = [];
if (typeof templateLibrary !== 'undefined') {
    for (let category in templateLibrary) {
        templateLibrary[category].forEach(template => {
            templateUrls.push(template.url); 
        });
    }
}

const urlsToCache = coreFilesToCache.concat(templateUrls);

// INSTALL STEP
self.addEventListener('install', event => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache: ', CACHE_NAME);
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

// ACTIVATE STEP
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

// FETCH STEP
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
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
