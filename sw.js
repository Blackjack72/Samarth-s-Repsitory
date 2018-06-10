var CACHE_NAME = 'static-cache';
var urlsToCache = [
  '.',
  '/modal_login.html',
  '/modal_login_style.css'
  '/homepage.html',
  '/homepage_tyle.css',
  '/splash.html',
  '/manifest.json',
  '/background.jpg',
  '/background_image1.jpg',
  '/pro_pic_blank.png',
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});
function fetchAndCache(url) {
  return fetch(url).then(function(response) {
    return caches.open(CACHE_NAME).then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  });
}

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
        if(CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});