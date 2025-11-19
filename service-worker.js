const CACHE_NAME = 'fitlife-arctic-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/bmi-calculator.html',
  '/calorie-calculator.html',
  '/manifest.json'
  // Tambahkan file html kalkulator lain di sini jika nanti Anda membuatnya
];

// 1. Install Service Worker & Cache semua file
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Ambil file dari Cache saat offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan dari cache. Jika tidak, ambil dari internet
        return response || fetch(event.request);
      })
  );
});

// 3. Update Cache jika ada versi baru
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
