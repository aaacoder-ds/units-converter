// Service Worker for Unit Converter
const CACHE_NAME = 'unit-converter-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/HTML/length.html',
  '/HTML/weight.html',
  '/HTML/volume.html',
  '/HTML/currency.html',
  '/HTML/temperature.html',
  '/CSS/length.css',
  '/CSS/weight.css',
  '/CSS/volume.css',
  '/CSS/currency.css',
  '/CSS/temperature.css',
  '/Javascript/length.js',
  '/Javascript/weight.js',
  '/Javascript/volume.js',
  '/Javascript/currency.js',
  '/Javascript/temperature.js',
  '/android-chrome-512x512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
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
    })
  );
}); 