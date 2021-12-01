var CACHE_NAME = 'pwa-sample-cache';
var urlsToCache = [
    '/',
    '/manifest.json',
    '/css/style.css',
    '/serviceworker.js',
    '/count.js',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(e) {
  // ここは空でもOK
})